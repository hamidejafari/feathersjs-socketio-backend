// Initializes the `rates` service on path `/rates`
const createService = require('feathers-sequelize');
const createModel = require('../../models/recordTypes.model');
const hooks = require('./recordTypes.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'recordTypes',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/recordTypes', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('recordTypes');

  service.hooks(hooks);
};
