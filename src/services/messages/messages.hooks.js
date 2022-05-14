/* eslint-disable indent,linebreak-style,no-unused-vars */
const { authenticate } = require('@feathersjs/authentication').hooks;
const { fastJoin } = require('feathers-hooks-common');
// const BatchLoader = require('@feathers-plus/batch-loader');
// const { getResultsByKey, getUniqueKeys } = BatchLoader;
const createMessageBefore = require('../../hooks/create-message-before');
const createMessageAfter = require('../../hooks/create-message-after');
const messagesFindAfter = require('../../hooks/messages-find-after');
const { keep } = require('feathers-hooks-common');

const messageResolvers = {
  joins: {
    User: (...args) => async (message, context) => {
      message.User = (await context.app.service('users').find({
        query: {
          id: message.userId,
          $select:['id','name','family','firebase_token','ios_firebase_token']
        }
      })).data[0];
    },
    Event: (...args) => async (message, context) => {
      message.Event = (await context.app.service('events').find({
        query: {
          id: message.eventId,
          $select:['id','userId','reservedId']
        }
      })).data[0];
    },
    Document: (...args) => async (message, context) => {
      message.Document = (await context.app.service('files').find({
        query: {
          id: message.documentId
        }
      })).data[0];
      //console.log(message.documentId);
      //console.log(message);
    },
  }
};
const query = {
  User: true,
  Event: true,
  Document: true
};

module.exports = {
  before: {
    all: [
      authenticate('jwt')
    ],
    find: [],
    get: [],
    create: [createMessageBefore()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [
      keep('id', 'messageBody','userId','eventId','documentId','createdAt'),
      fastJoin(messageResolvers, query)
    ],
    find: [],
    get: [],
    create: [
       createMessageAfter()
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
