const { authenticate } = require('@feathersjs/authentication').hooks;
const { fastJoin } = require('feathers-hooks-common');
const ratesCreateBefore = require('../../hooks/rates/rates-create-before');
const findAdvisorRates = require('../../hooks/rates/find-advisor-rates');
const rateResolvers = {
  joins: {
    User: (...args) => async (rate, context) => {
      const result = (await context.app.service('users').find({
        query: {
          id: rate.userId
        }
      }));
      //console.log(result);
      rate.User = null;
      if(result.data && result.data.length > 0){
        rate.User = result.data[0];
      }
    }
  }
};
const query = {
  User: true,
};



module.exports = {
  before: {
    all: [
      authenticate('jwt'),
    ],
    find: [
      findAdvisorRates()
    ],
    get: [
    ],
    create: [ratesCreateBefore()],
    update: [],
    patch: [],
    remove: []
  },
  after: {
    all: [
      fastJoin(rateResolvers, query)
    ],
    find: [
    ],
    get: [
      // fastJoin(rateResolvers, query)
    ],
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
