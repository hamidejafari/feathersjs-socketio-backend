const axios = require('axios');
const Sequelize = require('sequelize');
module.exports = function () {
    return async context => {
        const { Op } = Sequelize;
        const user = context.params.user;
        const sequelize = context.app.get("sequelizeClient");

        const usersModel = context.app.services.users.Model;
        const eventsModel = context.app.services.events.Model;

        if (context.data.$call) {
            delete context.data.$call;





            const destinationUser = await usersModel.findOne({
                where: {
                    id: context.data.receiverId,
                    //deviceId: { [Op.ne]: null }
                }
            });

            if (destinationUser === null) {
                throw new Error('مقصد مشخص نیست');
            }
            else {

                const currentEvent = await eventsModel.findOne({
                    where: {
                        isPhone: 1,
                        eventTypeId: 700,
                        [Op.or]: {
                            userId: destinationUser.id,
                            reservedId: destinationUser.id
                        }
                    }
                });

                if (currentEvent === null) {
                    throw new Error('مشاوره فعال برای مکالمه وجود ندارد');
                }

                let remainingTime = currentEvent.remainingTime;

                let callDuration = parseInt(remainingTime.replace('*','').trim());

                const caller = {
                    username: user.id,
                    displayName: user.name + ' ' + user.family,
                    platform: user.platform
                }
                const receptor = {
                    username: destinationUser.id,
                    displayName: destinationUser.name + ' ' + destinationUser.family,
                    platform: destinationUser.platform
                }

                try {
                    const payload = {
                        caller: caller,
                        receptor: receptor,
                        maxDuration:callDuration
                    };

                    const knResult = await axios({
                        method: 'post',
                        baseURL: 'https://api.kavenegar.io/user/v1/',
                        timeout: 10000,
                        url: 'calls',
                        headers: { 'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3ZW1vc2hhdmVyIiwicm9sZXMiOiJ1c2VyIiwidXNlcklkIjoyMDA3MjAsImFwcGxpY2F0aW9uSWQiOjE4NSwiaWF0IjoxNTYzNDgwMTQ2fQ.nxfvIfkcJ2aTIfM_X4LCjKovSBAcnyUuXALKMT90k2A' },
                        data: payload
                    });


                    await eventsModel.update({
                        callId: knResult.data.id
                    },{
                        where:{
                            id: currentEvent.id
                        }
                    })

                    context.data.senderId = user.id;

                    context.data.messageBody = JSON.stringify({
                        callId: knResult.data.id,
                        accessToken: knResult.data.caller.accessToken,
                        receptorAccessToken: knResult.data.receptor.accessToken
                    });

                }
                catch (ex) {
                    throw new Error(ex);
                }
            }
        }
    };
};