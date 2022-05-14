// Initializes the `conversations` service on path `/conversations`
const createService = require('feathers-sequelize');
const createModel = require('../../models/subjects.model');
const hooks = require('./subjects.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'subjects',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/subjects', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('subjects');

  service.hooks(hooks);
};
