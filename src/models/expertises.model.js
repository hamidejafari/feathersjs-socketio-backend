// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const expertises = sequelizeClient.define('expertises', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'type'
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'status'
    },
  },{
    tableName: 'expertise',
    timestamps: false
  },{
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  expertises.associate = function (models) {
    expertises.belongsToMany(models.users, { through: models.expertiseUser, foreignKey: 'expertiseId' });
  };

  return expertises;
};
