// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
    const sequelizeClient = app.get('sequelizeClient');
    const questions = sequelizeClient.define('questions', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        question: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'question'
        },
        answer: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'answer'
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'description'
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'category_id'
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        visit: {
            type: DataTypes.INTEGER,
            allowNull: true,
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
        },
        senderId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'sender_id'
        },
        recieverId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'reciever_id'
        },
        answerPrice: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'answer_price'
        },
        answerDate: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'answer_date'
        }
    },
        {
            timestamps: false
        },
        {
            hooks: {
                beforeCount(options) {
                    options.raw = true;
                }
            }
        });

    // eslint-disable-next-line no-unused-vars
    questions.associate = function (models) {

    };

    return questions;
};
