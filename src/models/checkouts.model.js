// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const checkouts = sequelizeClient.define('checkouts', {
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
    price: {
      type:   DataTypes.DOUBLE(11, 2),
      allowNull: false,
      field: 'price'
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'status'
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
  checkouts.associate = function (models) {
   
  };
  

  return checkouts;
};
