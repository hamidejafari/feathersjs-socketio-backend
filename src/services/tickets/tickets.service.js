// Initializes the `tickets` service on path `/tickets`
const createService = require('feathers-sequelize');
const createModel = require('../../models/tickets.model');
const hooks = require('./tickets.hook');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'tickets',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/tickets', createService(options));
  
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('tickets');

  service.hooks(hooks);
};
