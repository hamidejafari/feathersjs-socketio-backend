const axios = require('axios');
const Kavenegar = require('kavenegar');
const Sequelize = require('sequelize');


module.exports = function () {
    return async context => {
        const issuesModel = context.app.services.issues.Model;

        const usersModel = context.app.services.users.Model

        const destinationUser = await usersModel.findOne({
            where: {
                id: context.result.receiverId,
            }
        });

        const senderUser = await usersModel.findOne({
            where: {
                id: context.result.senderId,
            }
        });

        if (destinationUser !== null) {

            const body = ' ارسال پیام برای شما در بخش پرسش و پاسخ از طرف : ' + senderUser.name + ' ' + senderUser.family;
            try {
                const payload = {
                    "content_available": true,
                    "priority": "high",
                    "data": {
                        "text": "hii"
                    },
                    "to": destinationUser.firebaseToken,
                    "notification": {
                        title: 'آنی مشاور',
                        body: body,
                        sound: destinationUser.userTypeId > 1 ? 'moshaver':'notification'
                    }
                }

                const knResult = await axios({
                    method: 'post',
                    url: 'https://fcm.googleapis.com/fcm/send',
                    timeout: 10000,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'key=AAAA8W-jSo0:APA91bHFRZq7DEnJABaSWrrYbfKJWuuNzJ0EGIzyIFL0v7ZHPKbzhymu1qnmttBLEaBujZhKuFPBvBUWqcZ8y4yIAhkbzjUc0ek9VpIK9BtOrpOl5N1SBGMNg4k0JhUDIMsLWDoJzjSm'
                    },
                    data: payload
                });
/*
              await context.app.service('notifications').create({
                userId: destinationUser.id,
                message:body,
              });
*/
            }
            catch (ex) {
                // console.log(ex);
            }


            try {

                const issueCount = await issuesModel.count({
                    where: {
                        receiverId: context.result.receiverId,
                        senderId: context.result.senderId
                    }
                });

                if (issueCount == 1) {

                    const api = Kavenegar.KavenegarApi({
                        apikey: '5851696C716C452B7943595A45765152557476416B36797458426D534244447462636D557847683875664D3D'
                    });


                    api.VerifyLookup({
                        receptor: destinationUser.mobile,
                        token: senderUser.id,
                        template: "posesh"
                    }, function(response, status) {
                        // console.log(response);
                        // console.log(status);
                    });

                    /*

                   api.Send({
                    message: body,
                    receptor: destinationUser.mobile
                  },
                    function (response, status) {
                        console.log(body);
                      console.log(response);
                      console.log(status);
                    });
                    */
                }

            } catch (error) {
                // console.log(error)
            }
        }
    };
};
