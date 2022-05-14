const { authenticate } = require('@feathersjs/authentication').hooks;
const { fastJoin } = require('feathers-hooks-common');

const conversationResolvers = {
  joins: {
    User: (...args) => async (conversation, context) => {
      const result = (await context.app.service('users').find({
        query: {
          id: conversation.userId,
          $select: ['id', 'name', 'family']
        }
      })).data;

      if (result.length > 0) {
        const avatars = (await context.app.service('files').find({
          query: {
            $sort: { id: -1 },
            userId: result[0].id,
            title: 'p',
            status: 1
          }
        })).data;

        if (avatars.length > 0) {
          result[0].avatar = 'http://animoshaver.ir:5050/all-uploads/' + avatars[0].file;
        } else {
          result[0].avatar = 'http://panel.animoshaver.ir/user.png';
        }

        conversation.User = result[0];
      }
    },
    Advisor: (...args) => async (conversation, context) => {
      const result = (await context.app.service('users').find({
        query: {
          id: conversation.advisorId,
          $select: ['id', 'name', 'family']
        }
      })).data;

      if (result.length > 0) {
        const avatars = (await context.app.service('files').find({
          query: {
            $sort: { id: -1 },
            userId: result[0].id,
            title: 'p',
            status: 1
          }
        })).data;

        if (avatars.length > 0) {
          result[0].avatar = 'http://animoshaver.ir:5050/all-uploads/' + avatars[0].file;
        } else {
          result[0].avatar = 'http://panel.animoshaver.ir/user.png';
        }

        result[0].expertises = (await context.app.service('expertiseUser').find({
          query: {
            userId: result[0].id
          }
        })).data;

        conversation.Advisor = result[0];
      }
    },
  }
};
const query = {
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
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  after: {
    all: [fastJoin(conversationResolvers, query)],
    find: [],
    get: [],
    create: [
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
