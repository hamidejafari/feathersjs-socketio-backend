/* eslint-disable linebreak-style */
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const subjects = sequelizeClient.define('subjects', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    expertiseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'expertise_id'
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
    },
    questionContent: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'question_content'
    },
    answerContent: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'answer_content'
    },
    answeredAt: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'answered_at'
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });


  subjects.associate = function (models) {

  };

  return subjects;
};
