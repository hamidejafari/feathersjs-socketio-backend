// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const expertiseUser = sequelizeClient.define('expertiseUser', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'user_id'
    },
    expertiseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'expertise_id'
    },
  }, {
      timestamps: false,
      tableName: 'expertise_user'
    }, {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        }
      }
    });

  // eslint-disable-next-line no-unused-vars
  expertiseUser.associate = function (models) {

  };

  return expertiseUser;
};
