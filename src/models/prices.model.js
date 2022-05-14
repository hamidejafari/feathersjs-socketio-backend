// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const prices = sequelizeClient.define('prices', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'admin_id'
    },
    chatPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'chat_price'
    },
    callPrice: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'call_price'
    },
    facePrice: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'face_price'
    },
    subjectPrice: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'subject_price'
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
  prices.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return prices;
};
