const { authenticate } = require('@feathersjs/authentication').hooks;
const attemptsCreateBefore = require('../../hooks/attempts_create_before');
const attemptsCreateAfter = require('../../hooks/attempts_create_after');
module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [attemptsCreateBefore()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [attemptsCreateAfter()],
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
