const {authenticate} = require('@feathersjs/authentication').hooks;
const {fastJoin} = require('feathers-hooks-common');
const BatchLoader = require('@feathers-plus/batch-loader');
const {getResultsByKey, getUniqueKeys} = BatchLoader;
const approveOnlineChatAfter = require('../../hooks/approve-online-chat-after');
const approveOnlineChatBefore = require('../../hooks/approve-online-chat-before');
const requestOnlineChatBefore = require('../../hooks/request-online-chat-before');
const requestOnlineChatAfter = require('../../hooks/request-online-chat-after');
const removeEventRequestAfter = require('../../hooks/remove-event-request-after');

const eventRequestResolvers = {
  joins: {
    Expertise: (...args) => async (eventRequest, context) => {
      eventRequest.Expertise = (await context.app.service('expertises').find({
        query: {
          id: eventRequest.expertiseId
        }
      })).data[0];
    },
    ApprovedUser: (...args) => async (eventRequest, context) => {
      eventRequest.ApprovedUser = (await context.app.service('users').find({
        query: {
          id: eventRequest.approvedUserId
        }
      })).data[0];
    },
    RequestUser: (...args) => async (eventRequest, context) => {
      eventRequest.RequestUser = (await context.app.service('users').find({
        query: {
          id: eventRequest.userId
        }
      })).data[0];
    },
    RequestEvent: (...args) => async (eventRequest, context) => {
      eventRequest.RequestEvent = (await context.app.service('events').find({
        query: {
          id: eventRequest.eventId
        }
      })).data[0];
    }
  }
};
const query = {
  Expertise: true,
  ApprovedUser: true,
  RequestUser: true,
  RequestEvent: true
};

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [requestOnlineChatBefore()],
    update: [],
    patch: [approveOnlineChatBefore()],
    remove: []
  },

  after: {
    all: [
      fastJoin(eventRequestResolvers,query)
    ],
    find: [],
    get: [],
    create: [
      requestOnlineChatAfter()
    ],
    update: [],
    patch: [approveOnlineChatAfter()],
    remove: [
     removeEventRequestAfter()
    ]
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
