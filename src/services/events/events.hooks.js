/* eslint-disable linebreak-style,no-unused-vars */
const { authenticate } = require('@feathersjs/authentication').hooks;
const { fastJoin, disablePagination } = require('feathers-hooks-common');
const BatchLoader = require('@feathers-plus/batch-loader');
const { getResultsByKey, getUniqueKeys } = BatchLoader;
const reserveBefore = require('../../hooks/reserve-before');
const createEventBefore = require('../../hooks/create-event-before');
const userStatus = require('../../hooks/user-status');
const findMyEventPersons = require('../../hooks/find-my-event-persons');
const callUser = require('../../hooks/events/call-user');
// const eventsFindAfter = require('../../hooks/events-find-after');
const preventBatchRemoveEvents = require('../../hooks/prevent-batch-remove-events');
const moment = require('jalali-moment')
const voipEndCall = require('../../hooks/voip-end-call');

const { keep } = require('feathers-hooks-common');
const eventResolvers = {
  joins: {
    Expertise: (...args) => async (event, context) => {
      event.Expertise = (await context.app.service('expertises').find({
        query: {
          id: event.expertiseId
        }
      })).data[0];
      //console.log(event);
    },
    EventUser: (...args) => async (event, context) => {
      const result = (await context.app.service('users').find({
        query: {
          id: event.userId,
          $select: ['id', 'name', 'family','firebase_token']
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
        }

        event.EventUser = result[0];
      }
    },
    ReservedUser: (...args) => async (event, context) => {
      const result = (await context.app.service('users').find({
        query: {
          id: event.reservedId,
          $select: ['id', 'name', 'family','firebase_token']
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
        }

        event.ReservedUser = result[0];
      }
    },
    Documents: (...args) => async (event, context) => {
      //console.log(event.id);
      event.Docuemnts = (await context.app.service('messages').find({
        query: {
          eventId: event.id,
          documentId: {
            $ne: null
          },
          $select: ['id']
        }
      })).data;
    },
    jalaliStart: (...args) => async (event, context) => {
      try {
        event.jalaliStart = moment(event.start).locale('fa').format('YYYY/MM/DD HH:mm')
      } catch (ex) {
        event.jalaliStart = ''
      }
    }
  }
};
const query = {
  Expertise: true,
  EventUser: true,
  ReservedUser: true,
  Documents: false,
  jalaliStart: true
};

module.exports = {
  before: {
    all: [
      authenticate('jwt')
    ],
    find: [
      //disablePagination()
      //eventsFindBefore()
      findMyEventPersons()
    ],
    get: [
      callUser()
    ],
    create: [
      userStatus(),
      createEventBefore(),
    ],
    update: [],
    patch: [reserveBefore()],
    remove: [
      //preventBatchRemoveEvents()
    ]
  },

  after: {
    all: [
      fastJoin(eventResolvers, query)
    ],
    find: [
      //eventsFindAfter()
    ],
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
