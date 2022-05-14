const { disallow, iff, isNot } = require('feathers-hooks-common');
const isRest = () => context => context.params.provider === 'rest'
const { authenticate } = require("@feathersjs/authentication").hooks;
const getMyFavoritePersons = require("../../hooks/get-my-favorite-persons");
const favoriteThisPerson = require("../../hooks/favorite-this-person");
const unFavoriteThisPerson = require("../../hooks/unFavorite-this-person");
const { fastJoin } = require('feathers-hooks-common');

const eventResolvers = {
    joins: {
        Person: (...args) => async (like, context) => {
            const result = await context.app.service('users').get(like.likableId);
            like.Person = result;
        },
    }
};
const query = {
    Person: true
};

module.exports = {
    before: {
        all: [
            authenticate("jwt"),
            //iff(isNot(isRest()), disallow())
        ],
        find: [
            getMyFavoritePersons()
        ],
        get: [],
        create: [favoriteThisPerson()],
        update: [],
        patch: [],
        remove: [unFavoriteThisPerson()]
    },
    after: {
        all: [
            fastJoin(eventResolvers, query)
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
