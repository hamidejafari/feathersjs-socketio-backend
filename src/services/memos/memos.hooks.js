const { authenticate } = require("@feathersjs/authentication").hooks;
const beforeCall = require('../../hooks/before-call');
const afterCall = require('../../hooks/after-call');
module.exports = {
    before: {
        all: [
            authenticate("jwt")
        ],
        find: [],
        get: [],
        create: [beforeCall()],
        update: [],
        patch: [],
        remove: []
    },
    after: {
        all: [],
        find: [],
        get: [],
        create: [afterCall()],
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