const Sequelize = require('sequelize');
const { Op } = Sequelize;
module.exports = () => {
    return async context => {
        const user = context.params.user;

        const eventsModel = context.app.services.events.Model;

        const event = await eventsModel.findOne({
            where: {
                userId: user.id,
                eventTypeId: {
                    [Op.in]: [600, 700]
                }
            }
        });

        if (event !== null) {
            throw new Error('یک مشاوره فعال دارید');
        }


        context.data.userId = user.id;
    };
};