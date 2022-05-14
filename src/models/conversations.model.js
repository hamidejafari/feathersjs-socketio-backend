/* eslint-disable linebreak-style */
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const conversations = sequelizeClient.define('conversations', {
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
    advisorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'advisor_id'
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'order_id'
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'is_read'
    },
    userIsRead: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'user_is_read'
    },
    advisorIsRead: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'advisor_is_read'
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'is_blocked'
    },
    isArchived: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'is_archived'
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
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });


  conversations.associate = function (models) {

  };

  return conversations;
};
