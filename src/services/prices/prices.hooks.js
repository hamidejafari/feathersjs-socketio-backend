const { disallow, iff, isNot } = require('feathers-hooks-common');
const isRest = () => context => context.params.provider === 'rest'
const { authenticate } = require("@feathersjs/authentication").hooks;
const pricesCreateBefore = require('../../hooks/prices-create-before');

module.exports = {
    before: {
        all: [
            authenticate("jwt"),
            // iff(isNot(isRest()), disallow())
        ],
        find: [],
        get: [],
        create: [pricesCreateBefore()],
        update: [],
        patch: [],
        remove: []
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
