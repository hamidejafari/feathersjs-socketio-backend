const fileUploadBefore = require('../../hooks/file-upload-before');
const fileUploadAfter = require('../../hooks/file-upload-after');
const { disallow, iff } = require('feathers-hooks-common');
const { authenticate } = require('@feathersjs/authentication').hooks;
module.exports = {
  before: {
    all: [
      //authenticate('jwt')
    ],
    find: [],
    get: [],
    create: [
      fileUploadBefore()
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      fileUploadAfter()
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
