// Initializes the `attempts` service on path `/attempts`
const createService = require('feathers-sequelize');
const createModel = require('../../models/attempts.model');
const hooks = require('./attempts.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/attempts', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('attempts');

  service.hooks(hooks);
};
