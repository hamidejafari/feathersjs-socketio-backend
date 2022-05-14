// Initializes the `files` service on path `/files`
const createService = require('feathers-sequelize');
const createModel = require('../../models/scores.model');
const hooks = require('./scores.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'scores',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/scores', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('scores');

  service.hooks(hooks);
};
