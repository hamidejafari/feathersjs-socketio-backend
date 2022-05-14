// Initializes the `expertises` service on path `/expertises`
const createService = require('feathers-sequelize');
const createModel = require('../../models/expertises.model');
const hooks = require('./expertises.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'expertises',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/expertises', createService(options));
  
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('expertises');

  service.hooks(hooks);
};
