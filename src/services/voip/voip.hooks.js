// const { disallow, iff, isNot } = require('feathers-hooks-common');
// const isRest = () => context => context.params.provider === 'rest'
const callUserInput = require('../../hooks/voip/call-user-input');
const callUserOutput = require('../../hooks/voip/call-user-output');
module.exports = {
  before: {
    all: [],
    find: [callUserInput()],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [callUserOutput()],
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
