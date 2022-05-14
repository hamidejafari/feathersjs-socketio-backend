// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const events = sequelizeClient.define('events', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull:  false
    },
    callId: {
      type: DataTypes.STRING,
      allowNull:  true,
      field: 'call_id'
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id'
    },
    reservedId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'reserved_id'
    },
    eventTypeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'event_type_id'
    },
    expertiseId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'expertise_id'
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'order_id'
    },
    checkoutOrderId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'checkout_order_id'
    },
    checkoutId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'checkout_id'
    },
    dateCheckout: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'date_checkout'
    },
    tax: {
      type:   DataTypes.DOUBLE(11, 2),
      allowNull: true,
      field: 'tax'
    },
    priceId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'price_id'
    },
    finalIncome: {
      type:   DataTypes.DOUBLE(11, 2),
      allowNull: true,
      field: 'final_income'
    },
    unitPrice: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'unit_price'
    },
    reserveTime: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'reserve_time'
    },
    start: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'start'
    },
    end: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'end'
    },
    isChat: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'is_chat'
    },
    isPhone: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'is_phone'
    },
    isFace: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'is_face'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_at'
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'deleted_at'
    },
    remainingTime: {
      type: DataTypes.STRING,
      allowNull:  true,
      field: 'remaining_time'
    },
    userFullName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'user_full_name'
    },
    reservedFullName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'reserved_full_name'
    }
  },{
    paranoid: true
  } ,{
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  events.associate = function (models) {
    events.belongsTo(models.users,{foreignKey: 'user_id', targetKey: 'id'})
    events.belongsTo(models.users,{foreignKey: 'reserved_id', targetKey: 'id'})
  };

  return events;
};
