/* eslint-disable linebreak-style */
module.exports = function () {
    return async context => {
        const usersModel = context.app.services.users.Model;
        const userId = context.id;
        const cUser = await usersModel.findOne({
            where: {
                id: userId,
				allowWork:0
            }
        });
        if (context.data.online && context.data.online === 1 && cUser) {
            throw new Error('مشاور اجازه آنلاین شدن ندارد');
        }
    }
}
