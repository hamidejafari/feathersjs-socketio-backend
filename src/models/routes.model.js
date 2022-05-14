// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
    const sequelizeClient = app.get('sequelizeClient');
    const routes = sequelizeClient.define('routes', {
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
        url: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'url'
        },
        icon: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'icon'
        },
        userTypeId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'user_type_id'
        }
    },
        {
            timestamps: false,
            tableName: 'routes'
        },
        {
            hooks: {
                beforeCount(options) {
                    options.raw = true;
                }
            }
        });

    // eslint-disable-next-line no-unused-vars
    routes.associate = function (models) {

    };

    return routes;
};
