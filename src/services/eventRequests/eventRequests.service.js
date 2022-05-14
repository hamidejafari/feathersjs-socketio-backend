// Initializes the `eventRequests` service on path `/eventRequests`
const createService = require('feathers-sequelize');
const createModel = require('../../models/eventRequests.model');
const hooks = require('./eventRequests.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'eventRequests',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/eventRequests', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('eventRequests');

  service.hooks(hooks);
};
