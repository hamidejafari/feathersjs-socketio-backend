/* eslint-disable linebreak-style */
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
    const sequelizeClient = app.get('sequelizeClient');
    const issues = sequelizeClient.define('issues', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'message'
        },
        senderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'sender_id'
        },
        receiverId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'receiver_id'
        },
        conversationId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'conversation_id'
        },
        isRead: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: 'is_read'
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
        }
    }, {
        hooks: {
            beforeCount(options) {
                options.raw = true;
            }
        }
    });


    issues.associate = function (models) {

    };

    return issues;
};
