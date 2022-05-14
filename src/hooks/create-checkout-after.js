const moment = require('jalali-moment');
const Sequelize = require('sequelize');
const { Op } = Sequelize;
module.exports = function () {
    return async context => {
        const checkoutId = context.result.id;

        const eventsModel = context.app.services.events.Model;
        const ordersModel = context.app.services.orders.Model;

        const notCheckedoutEvents = await eventsModel.findAll({
            where:
            {
                userId: context.result.userId,
                checkoutId: null,
                dateCheckout: null,
                eventTypeId: {
                    [Op.in]: [100, 110,120]
                }
            }
        });

        for (const event of notCheckedoutEvents) {
           
            await ordersModel.create({
                userId: context.result.userId,
                totalPrice: event.finalIncome + event.tax,
                payments: event.finalIncome,
                discount: event.tax,
                planId: 3,
                quantity: 1,
                status: 1,
                createdAt: moment().unix(),
                updatedAt: moment().unix(),
                isIncomeFactor: 1,
                description: 'حق مشاوره '
            });
        }

        await eventsModel.update({
            checkoutId: checkoutId
        }, {
            where:
            {
                userId: context.result.userId,
                checkoutId: null,
                dateCheckout: null,
                eventTypeId: {
                    [Op.in]: [100, 110,120]
                }
            }
        })
    };
};