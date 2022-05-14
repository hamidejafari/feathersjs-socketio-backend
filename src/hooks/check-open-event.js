/* eslint-disable linebreak-style */
const moment = require("jalali-moment");
const Sequelize = require('sequelize');
module.exports = function () {
    return async context => {
        const id = context.id;
        const { Op } = Sequelize;
        const eventsModel = context.app.services.events.Model;
        if (id !== null) {

            const currentEvent = await eventsModel.findOne({
                where: {
                    eventTypeId: { [Op.in]: [600, 700] },
                    [Op.or]: {
                        userId: id,
                        reservedId: id
                    }
                }
            });

            // console.log(context.data);

            if(context.data.online && context.data.online === 1 &&  currentEvent !== null){
                throw new Error('امکان آنلاین شدن وجود ندارد - یک مشاوره فعال دارید');
            }

        }
    }
}
