// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
    const sequelizeClient = app.get('sequelizeClient');
    const files = sequelizeClient.define('comments', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'comment'
        },
        commentableId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'commentable_id'
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'user_id'
        },
        commentableType: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'commentable_type'
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
    }, {
            timestamps: false
        }, {
            hooks: {
                beforeCount(options) {
                    options.raw = true;
                }
            }
        });

    // eslint-disable-next-line no-unused-vars
    files.associate = function (models) {
        // Define associations here
        // See http://docs.sequelizejs.com/en/latest/docs/associations/
    };

    return files;
};
