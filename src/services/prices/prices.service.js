// Initializes the `rates` service on path `/rates`
const createService = require('feathers-sequelize');
const createModel = require('../../models/prices.model');
const hooks = require('./prices.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'prices',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/prices', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('prices');

  service.hooks(hooks);
};
