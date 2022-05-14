// Initializes the `eventRequests` service on path `/eventRequests`
const createService = require('feathers-sequelize');
const createModel = require('../../models/questionCategories.model');
const hooks = require('./questionCategories.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'questionCategories',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/questionCategories', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('questionCategories');

  service.hooks(hooks);
};
