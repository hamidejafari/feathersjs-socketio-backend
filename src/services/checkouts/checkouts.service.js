// Initializes the `checkouts` service on path `/checkouts`
const createService = require('feathers-sequelize');
const createModel = require('../../models/checkouts.model');
const hooks = require('./checkouts.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'checkouts',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/checkouts', createService(options));
  
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('checkouts');

  service.hooks(hooks);
};
