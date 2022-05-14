// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const tickets = sequelizeClient.define('tickets', {
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id'
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'content'
    },
    file: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'file'
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'status'
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'type'
    },
    createdAt: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'updated_at'
    },
    deletedAt: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'deleted_at'
    },
    message: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'message'
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'department_id'
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'parent_id'
    }
  }, {
      tableName: 'ticket',
      timestamps: false
    });

  // eslint-disable-next-line no-unused-vars
  tickets.associate = function (models) {
    // tickets.hasMany(tickets, { as: 'replies', foreignKey: 'parentId', useJunctionTable: false })
  };

  return tickets;
};
