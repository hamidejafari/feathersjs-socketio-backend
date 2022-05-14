// Initializes the `eventRequests` service on path `/eventRequests`
const createService = require('feathers-sequelize');
const createModel = require('../../models/services.model');
const hooks = require('./services.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'services',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/services', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('services');

  service.hooks(hooks);
};
