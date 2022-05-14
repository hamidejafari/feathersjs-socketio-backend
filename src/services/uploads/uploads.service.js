// Initializes the `uploads` service on path `/uploads`
const createService = require('feathers-sequelize');
const createModel = require('../../models/uploads.model');
const hooks = require('./uploads.hooks');

const blobService = require('feathers-blob');
const fs = require('fs-blob-store');
const blobStorage = fs('./public/all-uploads');

const multer = require('multer');
const multipartMiddleware = multer();

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'uploads',
    Model,
    paginate
  };

  app.use('/uploads',
    multipartMiddleware.single('uri'),
    function (req, res, next) {
      req.feathers.file = req.file;
      next();
    },
    blobService({ Model: blobStorage })
  );

  const service = app.service('uploads');

  service.hooks(hooks);
};
