// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
    const sequelizeClient = app.get('sequelizeClient');
    const recordTypes = sequelizeClient.define('recordTypes', {
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
        force: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: 'force'
        },
        createdAt: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'created_at'
        },
        updatedAt: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'updated_at'
        }
    },
        {
            timestamps: false,
            tableName: 'record_types'
        },
        {
            hooks: {
                beforeCount(options) {
                    options.raw = true;
                }
            }
        });

    // eslint-disable-next-line no-unused-vars
    recordTypes.associate = function (models) {

    };

    return recordTypes;
};
