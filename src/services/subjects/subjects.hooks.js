const { authenticate } = require('@feathersjs/authentication').hooks;
const { fastJoin } = require('feathers-hooks-common');
const patchSubjectBefore = require('../../hooks/patch-subject-before');
const createSubjectBefore = require('../../hooks/create-subject-before');
const createSubjectAfter = require('../../hooks/create-subject-after');
const subjectResolvers = {
  joins: {
    Expertise: (...args) => async(subject,context) => {

      const result = (await context.app.service('expertises').find({
        query: {
          id: subject.expertiseId,
          $select: ['id', 'title']
        }
      }));
      subject.Expertise = null;
      if(result && result.data && result.data.length > 0){
        subject.Expertise = result.data[0];
      }
    },
    User: (...args) => async (subject, context) => {
      const result = (await context.app.service('users').find({
        query: {
          id: subject.userId,
          $select: ['id', 'name', 'family']
        }
      })).data;

      if (result.length > 0) {
        const avatars = (await context.app.service('files').find({
          query: {
            $sort: { id: -1 },
            userId: result[0].id,
            title: "p",
            status: 1
          }
        })).data;

        if (avatars.length > 0) {
          result[0].avatar = "http://animoshaver.ir:5050/all-uploads/" + avatars[0].file;
        } else {
          result[0].avatar = 'http://panel.animoshaver.ir/user.png';
        }

        subject.User = result[0];
      }
    },
    Advisor: (...args) => async (subject, context) => {
      const result = (await context.app.service('users').find({
        query: {
          id: subject.advisorId,
          $select: ['id', 'name', 'family']
        }
      })).data;

      if (result.length > 0) {
        const avatars = (await context.app.service('files').find({
          query: {
            $sort: { id: -1 },
            userId: result[0].id,
            title: "p",
            status: 1
          }
        })).data;

        if (avatars.length > 0) {
          result[0].avatar = "http://animoshaver.ir:5050/all-uploads/" + avatars[0].file;
        } else {
          result[0].avatar = 'http://panel.animoshaver.ir/user.png';
        }

        result[0].expertises = (await context.app.service('expertiseUser').find({
          query: {
            userId: result[0].id
          }
        })).data;

        subject.Advisor = result[0];
      }
    },
  }
};
const query = {
  Expertise: true,
  User: true,
  Advisor: true
};

module.exports = {
  before: {
    all: [
      authenticate('jwt')
    ],
    find: [],
    get: [],
    create: [createSubjectBefore()],
    update: [],
    patch: [],
    remove: []
  },
  after: {
    all: [fastJoin(subjectResolvers, query)],
    find: [],
    get: [],
    create: [
      createSubjectAfter()
    ],
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
