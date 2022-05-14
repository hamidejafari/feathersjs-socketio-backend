const { disallow, iff, isNot } = require('feathers-hooks-common');
const isRest = () => context => context.params.provider === 'rest';
const { authenticate } = require('@feathersjs/authentication').hooks;
const { fastJoin, disablePagination } = require('feathers-hooks-common');
const createQuestionBefore = require('../../hooks/create-question-before');
const moment = require('jalali-moment');

const eventResolvers = {
  joins: {
    Category: (...args) => async (question, context) => {
      question.Category = (await context.app.service('questionCategories').get(question.categoryId));
    },
    Sender: (...args) => async (question, context) => {
      question.Sender = null;
      if (question.senderId)
        question.Sender = (await context.app.service('users').get(question.senderId));
    },
    Reciever: (...args) => async (question, context) => {
      question.Reciever = null;
      if (question.recieverId)
        question.Reciever = (await context.app.service('users').get(question.recieverId));

    },
    jalaliAnswerDate: () => question => {
      question.jalaliAnswerDate = null;
      if (question.answerDate)
        question.jalaliAnswerDate = moment.unix(question.answerDate).locale('fa').format('YYYY/MM/DD HH:mm');
    },
  }
};
const query = {
  Category: true,
  Sender: true,
  Reciever: true,
  jalaliAnswerDate: true
};

module.exports = {
  before: {
    all: [

    ],
    find: [],
    get: [],
    create: [ authenticate('jwt'),createQuestionBefore()],
    update: [ authenticate('jwt')],
    patch: [ authenticate('jwt')],
    remove: [ authenticate('jwt')]
  },
  after: {
    all: [
      fastJoin(eventResolvers, query)
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
