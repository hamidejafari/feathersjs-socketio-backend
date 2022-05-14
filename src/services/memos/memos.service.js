// Initializes the `rates` service on path `/rates`
const createService = require('feathers-sequelize');
const createModel = require('../../models/memos.model');
const hooks = require('./memos.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'memos',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/memos', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('memos');

  service.hooks(hooks);
};
