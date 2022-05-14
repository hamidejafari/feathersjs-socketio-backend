// Initializes the `voip` service on path `/voip`
const createService = require('feathers-sequelize');
const createModel = require('../../models/events.model');
const hooks = require('./voip.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const Model = createModel(app);
  const options = {
    Model,
    paginate,
    id: 'id'
  };

  // Initialize our service with any options it requires
  app.use('/voip', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('voip');

  service.hooks(hooks);
};
