const { fastJoin } = require('feathers-hooks-common');
const BatchLoader = require('@feathers-plus/batch-loader');
const { getResultsByKey, getUniqueKeys } = BatchLoader;

const expertiseUserResolvers = {
  joins: {
    Expertise: (...args) => async (expertiseUser, context) => {
      expertiseUser.Expertise = (await context.app.service('expertises').find({
        query: {
          id: expertiseUser.expertiseId
        }
      })).data[0];
    },
    User: (...args) => async (expertiseUser, context) => {
      expertiseUser.User = (await context.app.service('users').find({
        query: {
          $select: ['id','name', 'family','firebase_token','ios_firebase_token','online'],
          id: expertiseUser.userId
        }
      })).data[0];
    },
  }
};
const query = {
  Expertise: true,
  User:true
};

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [
      fastJoin(expertiseUserResolvers, query)
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
