/* eslint-disable linebreak-style */
const { authenticate } = require('@feathersjs/authentication').hooks;
const createOrderBefore = require('../../hooks/create-order-before');
const {fastJoin} = require('feathers-hooks-common');
const moment = require('jalali-moment')
const numeral = require('numeral')
const orderResolvers = {
  joins: {
    Plan : (...args) => async (order, context) => {
      order.Plan = (await context.app.service('plans').find({
        query: {
          id: order.planId
        }
      })).data[0];
    },
    numeralPayments: () => order => { order.numeralPayments = numeral(order.payments).format('0,0')},
    jalaliCreatedAt: () => order => { order.jalaliCreatedAt = moment.unix(order.createdAt).locale('fa').format('YYYY/MM/DD HH:mm')},
  }
};
const query = {
  Plan: true,
  jalaliCreatedAt : true,
  numeralPayments: true
};
module.exports = {
  before: {
    all: [
      authenticate('jwt')
    ],
    find: [],
    get: [],
    create: [
      createOrderBefore()
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [
      fastJoin(orderResolvers, query)
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
