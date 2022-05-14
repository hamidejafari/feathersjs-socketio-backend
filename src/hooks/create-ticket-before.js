const moment = require('jalali-moment');
module.exports = function () {
    return async context => {
        const user = context.params.user;
        const sequelize = context.app.get("sequelizeClient");
        const ticketsModel = context.app.services.tickets.Model

        context.data.userId = user.id;
        context.data.createdAt = moment().unix();
        context.data.updatedAt = moment().unix();
    };
};