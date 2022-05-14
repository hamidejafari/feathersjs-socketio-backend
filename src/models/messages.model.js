/* eslint-disable linebreak-style */
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const messages = sequelizeClient.define('messages', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    messageBody: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'message_body'
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id'
    },
    userFullName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'user_full_name'
    },
    messageTypeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'message_type_id'
    },
    messageSourceId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'message_source_id'
    },
    documentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'document_id'
    },
    documentUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'document_url'
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'event_id'
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
    }
  }, {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        }
      }
    });


  messages.associate = function (models) {

  };

  return messages;
};
