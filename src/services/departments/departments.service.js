// Initializes the `departments` service on path `/departments`
const createService = require('feathers-sequelize');
const createModel = require('../../models/departments.model');
const hooks = require('./departments.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'departments',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/departments', createService(options));
  
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('departments');

  service.hooks(hooks);
};
