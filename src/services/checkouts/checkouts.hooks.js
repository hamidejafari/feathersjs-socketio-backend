const { authenticate } = require('@feathersjs/authentication').hooks;
const { fastJoin } = require('feathers-hooks-common');
const moment = require('jalali-moment');
const createCheckoutBefore = require('../../hooks/create-checkout-before');
const createCheckoutAfter = require('../../hooks/create-checkout-after');

const checkoutResolvers = {
    joins: {
        User: (...args) => async (checkout, context) => {
            const result = await context.app.service('users').get(checkout.userId);
            checkout.User = result;
        },
        jalaliCreatedAt: () => checkout => {
            checkout.jalaliCreatedAt = moment.unix(checkout.createdAt).locale('fa').format('YYYY/MM/DD HH:mm');
        },
    }
};
const query = {
    User: true,
    jalaliCreatedAt: true
};
module.exports = {
    before: {
        all: [
            authenticate('jwt')
        ],
        find: [],
        get: [],
        create: [
            createCheckoutBefore()
        ],
        update: [],
        patch: [],
        remove: []
    },

    after: {
        all: [
            fastJoin(checkoutResolvers, query)
        ],
        find: [],
        get: [],
        create: [
            createCheckoutAfter()
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
