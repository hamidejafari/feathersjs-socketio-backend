// Initializes the `rates` service on path `/rates`
const createService = require('feathers-sequelize');
const createModel = require('../../models/rates.model');
const hooks = require('./rates.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'rates',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/rates', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('rates');

  service.hooks(hooks);
};
