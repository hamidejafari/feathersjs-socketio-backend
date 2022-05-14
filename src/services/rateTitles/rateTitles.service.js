// Initializes the `rates` service on path `/rates`
const createService = require('feathers-sequelize');
const createModel = require('../../models/rateTitles.model');
const hooks = require('./rateTitles.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'rateTitles',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/rateTitles', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('rateTitles');

  service.hooks(hooks);
};
