/* eslint-disable indent */
module.exports = function () {
    return async context => {
        const user = context.params.user;
        const sequelize = context.app.get('sequelizeClient');
        if (context.params.query.$myEventPersons) {
            delete context.params.query.$myEventPersons;
            context.params.sequelize = {
                attributes: [
                    [sequelize.fn('DISTINCT', sequelize.col('user_id')), 'userId'],'reservedId'
                ],
                where:{
                    reservedId : user.id
                }
            };
        }
    };
};
