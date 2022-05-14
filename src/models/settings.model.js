// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const settings = sequelizeClient.define('settings', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    titleApp1: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'title_app1'
    },
    titleApp2: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'title_app2'
    },
    titleApp3: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'title_app3'
    },
    titleApp4: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'title_app4'
    },
    titleApp5: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'title_app5'
    },
    titleAppSub1: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'title_app_sub1'
    },
    titleAppSub2: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'title_app_sub2'
    },
    titleAppSub3: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'title_app_sub3'
    },
    titleAppSub4: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'title_app_sub4'
    },
    titleAppSub5: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'title_app_sub5'
    },
    appHeaderImage:{
      type: DataTypes.STRING,
      allowNull: true,
      field: 'app_header_image'
    }
  }, {
    timestamps: false,
    tableName: 'setting'
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  settings.associate = function (models) {

  };

  return settings;
};
