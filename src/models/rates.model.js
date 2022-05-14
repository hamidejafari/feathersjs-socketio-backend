// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const rates = sequelizeClient.define('rates', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    rateValue: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'rate_value'
    },
    ratableId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'ratable_id'
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id'
    },
    approvedAdminId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'approved_admin_id'
    },
    ratableType: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'ratable_type'
    },
    reviewText: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'review_text'
    },
    details: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'details'
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
    timestamps: true
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  rates.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    // rates.belongsTo(models.users);
  };

  return rates;
};
