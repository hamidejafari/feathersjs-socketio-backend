// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const orders = sequelizeClient.define('orders', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id'
    },
    planId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'plan_id'
    },
    totalPrice: {
      type: DataTypes.DOUBLE(15, 2),
      allowNull: true,
      field: 'total_price'
    },
    payments: {
      type: DataTypes.DOUBLE(15, 2),
      allowNull: true,
      field: 'payments'
    },
    discount: {
      type: DataTypes.DOUBLE(15, 2),
      allowNull: true,
      field: 'discount'
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'quantity'
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'status'
    },
    isIncomeFactor: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'is_income_factor'
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'description'
    },
    createdAt: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'updated_at',
    },
  },{
    timestamps: false
  } ,{
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  orders.associate = function (models) {
    orders.belongsTo(models.plans); 
  };
  

  return orders;
};
