// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const rateTitles = sequelizeClient.define('rateTitles', {
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
    point: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'point'
    },
    show: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'show'
    },
  },{
    tableName: 'rate_titles',
    timestamps: false
  },{
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  rateTitles.associate = function (models) {
   
  };

  return rateTitles;
};
