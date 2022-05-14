const {authenticate} = require('@feathersjs/authentication').hooks;
const {fastJoin} = require('feathers-hooks-common');
const createAcceptAfter = require('../../hooks/create-accept-after');

const acceptResolvers = {
  joins: {
    MainService: (...args) => async (accept, context) => {
      const serviceData = (await context.app.service('services').find({
        query: {
          id: accept.serviceId
        }
      })).data;
      accept.MainService = null;
      if(serviceData && serviceData.length > 0){
        accept.MainService = serviceData[0];
      }
    },
    ChildService: (...args) => async (accept, context) => {
      const serviceData = (await context.app.service('services').find({
        query: {
          id: accept.serviceSubId
        }
      })).data;
      accept.ChildService = null;
      if(serviceData && serviceData.length > 0){
        accept.ChildService = serviceData[0];
      }
    },
    Order: (...args) => async (accept, context) => {
      const ordersData = (await context.app.service('orders').find({
        query: {
          id: accept.orderId
        }
      })).data;
      accept.Order = null;
      if(ordersData && ordersData.length > 0){
        accept.Order = ordersData[0];
      }
    }
  }
};
const query = {
  Order: true,
  MainService:true,
  ChildService:true
};


module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  after: {
    all: [ fastJoin(acceptResolvers, query)],
    find: [],
    get: [],
    create: [createAcceptAfter()],
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
