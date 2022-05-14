// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const accepts = sequelizeClient.define('accepts', {
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
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'user_id'
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'order_id'
    },
    advisorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'adviser_ir'
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'service_id'
    },
    serviceSubId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'service_sub_id'
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'price'
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'updated_at'
    }
  }, {
    timestamps: false
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  accepts.associate = function (models) {

  };

  return accepts;
};
