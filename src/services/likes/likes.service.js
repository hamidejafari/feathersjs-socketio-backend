// Initializes the `likes` service on path `/likes`
const createService = require('feathers-sequelize');
const createModel = require('../../models/likes.model');
const hooks = require('./likes.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'likes',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/likes', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('likes');

  service.hooks(hooks);
};
