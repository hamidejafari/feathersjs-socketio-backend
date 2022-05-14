const _ = require('lodash')
const Sequelize = require('sequelize');
const { Op } = Sequelize;
const moment = require('jalali-moment');
module.exports = function () {
    return async context => {
        const sequelize = context.app.get("sequelizeClient");

        const user = context.params.user;
        context.data.userId = user.id;
        context.data.createdAt = moment().unix();
        context.data.updatedAt = moment().unix();
        context.data.status = 0;


        const eventsModel = context.app.services.events.Model;

        const notCheckedoutEventsIncomeSum = await eventsModel.findOne({
            attributes: [[sequelize.fn('SUM', sequelize.col('final_income')), 'price']],
            where:
            {
                userId: user.id,
                checkoutId: null,
                dateCheckout: null,
                eventTypeId: {
                    [Op.in]: [100, 110,120]
                }
            }
        });

        console.log(notCheckedoutEventsIncomeSum.get('price'));

        if (notCheckedoutEventsIncomeSum.get('price') === null || notCheckedoutEventsIncomeSum.get('price') === '0.00') {
            throw new Error('مشاوره تسویه نشده وجود  ندارد');
        }

        context.data.price = notCheckedoutEventsIncomeSum.get('price');

    };
};