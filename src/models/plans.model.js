// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const plans = sequelizeClient.define('plans', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'title'
    },
    file: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'file'
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'name'
    },
    day: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'day'
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'price'
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'start_date'
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'end_date'
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'content'
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'price'
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: 'status'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at'
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'deleted_at'
    }
  });


  return plans;
};
