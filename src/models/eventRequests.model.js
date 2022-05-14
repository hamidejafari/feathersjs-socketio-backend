// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const eventRequests = sequelizeClient.define('event_requests', {
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
    needed: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    approveDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'approve_date'
    },
    approvedUserId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'approved_user_id'
    },
    expertiseId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'expertise_id'
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'type_id'
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
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'event_id'
    },
    userFullName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'user_full_name'
    },
    expertiseFullName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'expertise_full_name'
    },
    approvedFullName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'approved_full_name'
    }
  }, {
    paranoid: true
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  eventRequests.associate = function (models) {
    eventRequests.belongsTo(models.events);
    eventRequests.belongsTo(models.expertises);
    eventRequests.belongsTo(models.users,{foreignKey: 'user_id', targetKey: 'id'});
    eventRequests.belongsTo(models.users,{foreignKey: 'approved_user_id', targetKey: 'id'});
  };

  return eventRequests;
};
