module.exports = function () {
    return async context => {
        const sequelize = context.app.get("sequelizeClient");
        const user = context.params.user;
     
        if (context.params.query.$unFavoritesThisPerson) {
            const query = {
                query: {
                    $sort: { id: 1 },
                    userId: user.id,
                    likableId: context.params.query.$personId,
                    likableType: 'App\\User'
                }
            };
            const likesModel = context.app.services.likes.Model

            const result = await likesModel.findOne({
                where: {
                    userId: user.id,
                    likableId: context.params.query.$personId,
                    likableType: 'App\\User'
                }
            });
            if (result === null) {
                throw new Error('این مشاور در لیست مشاوران محبوب شما نیست');
            }
            context.id = result.get('id');
            //console.log(context.id);
            if(context.id === null){
                throw new Error('batch remove error : likes.');
            }
            delete context.params.query.$unFavoritesThisPerson;
            delete context.params.query.$personId;
        }
    }
};
