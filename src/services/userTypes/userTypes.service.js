// Initializes the `userTypes` service on path `/user-types`
const createService = require('feathers-sequelize');
const createModel = require('../../models/userTypes.model');
const hooks = require('./userTypes.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'userTypes',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/userTypes', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('userTypes');

  service.hooks(hooks);
};
