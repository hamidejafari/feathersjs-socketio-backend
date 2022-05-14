const { disallow, iff, isNot } = require('feathers-hooks-common');
const isRest = () => context => context.params.provider === 'rest';
const { authenticate } = require('@feathersjs/authentication').hooks;
module.exports = {
  before: {
    all: [

    ],
    find: [],
    get: [],
    create: [ authenticate('jwt')],
    update: [ authenticate('jwt')],
    patch: [ authenticate('jwt')],
    remove: [ authenticate('jwt')]
  },
  after: {
    all: [],
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
