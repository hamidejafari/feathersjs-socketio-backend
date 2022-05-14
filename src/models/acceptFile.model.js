// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const acceptFile = sequelizeClient.define('acceptFile', {
    fileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'file_id'
    },
    acceptId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'accept_id'
    },
  }, {
    timestamps: false,
    tableName: 'accept_file'
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  acceptFile.associate = function (models) {

  };

  return acceptFile;
};
