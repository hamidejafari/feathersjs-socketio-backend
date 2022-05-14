const moment = require('jalali-moment');
module.exports = function () {
    return async context => {
        const sequelize = context.app.get("sequelizeClient");
        const user = context.params.user;
        if (context.data.$favoritesThisPerson) {
            const query = {
                query: {
                    $sort: { id: 1 },
                    userId: user.id,
                    likableId: context.data.$personId,
                    likableType: 'App\\User'
                }
            };
            const likesModel = context.app.services.likes.Model

            const result = await likesModel.findOne({
                where: {
                    userId: user.id,
                    likableId: context.data.$personId,
                    likableType: 'App\\User'
                }
            });
            if (result !== null) {
                throw new Error('این مشاور قبلا به لیست شماوران محبوب شما اضافه شده است');
            }

            delete context.data.$favoritesThisPerson;
            context.data.userId = user.id;
            context.data.likableId = context.data.$personId;
            context.data.likableType = 'App\\User';
            context.data.likeValue = 1;
            const time = moment().format('YYYY-MM-DD HH-mm-ss');
            context.data.createdAt = time;
            context.data.updatedAt = time;
            delete context.data.$personId;
        }
    }
};
