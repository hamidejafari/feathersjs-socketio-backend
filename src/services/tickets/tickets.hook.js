/* eslint-disable linebreak-style */
const moment = require('jalali-moment')
const {fastJoin} = require('feathers-hooks-common');
const { authenticate } = require('@feathersjs/authentication').hooks;
const createTicketBefore = require('../../hooks/create-ticket-before');

const ticketResolvers = {
  joins: {
    User : (...args) => async (ticket, context) => {
      ticket.User = (await context.app.service('users').find({
        query: {
          id: ticket.userId
        }
      })).data[0];
    },
    Department : (...args) => async (ticket, context) => {
      ticket.Department = (await context.app.service('departments').find({
        query: {
          id: ticket.departmentId
        }
      })).data[0];
    },
    Reply : (...args) => async (ticket, context) => {
      const replies = (await context.app.service('tickets').find({
        query: {
          parentId: ticket.id
        }
      }));
      ticket.Reply = null;

      if(replies && replies.data.length > 0){
        ticket.Reply = replies.data[0];
      }
    },
    jalaliCreatedAt: () => ticket => {
      ticket.jalaliCreatedAt = moment.unix(ticket.createdAt).locale('fa').format('YYYY/MM/DD HH:mm')
    },
    statusText : (...args) => async (ticket, context) => {
      ticket.statusText = '';
      if(ticket.status === 0){
        ticket.statusText = 'در انتظار پاسخ';
      }else if(ticket.status === 1) {
        ticket.statusText = 'پاسخ داده شده';
      }else{
        ticket.statusText = 'بسته شده است';
      }
    },
  }
};
const query = {
  User:true,
  Department: true,
  Reply:true,
  statusText:true,
  jalaliCreatedAt : true,
};

module.exports = {
  before: {
    all: [
      authenticate('jwt')
    ],
    find: [],
    get: [],
    create: [createTicketBefore()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [
      fastJoin(ticketResolvers, query)
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
