const axios = require('axios');
module.exports = function () {
  return async context => {
    const user = context.params.user;
    const sequelize = context.app.get('sequelizeClient');

    const usersModel = context.app.services.users.Model;

    const destinationUser = await usersModel.findOne({
      where: {
        id: context.result.receiverId,
        deviceId: { $ne: null }
      }
    });

    const senderUser = await usersModel.findOne({
      where: {
        id: context.result.senderId,
        deviceId: { $ne: null }
      }
    });

    if (destinationUser !== null) {
      try {
        const msg =  ' تماس تلفنی از طرف : ' + senderUser.name + ' ' + senderUser.family;
        const payload = {
          'content_available': true,
          'priority': 'high',
          'data': {
            'text': 'hii'
          },
          'to': destinationUser.firebaseToken,
          'notification': {
            title: 'آنی مشاور',
            body: msg,
            token: destinationUser.firebaseToken,
            sound:'notification'
          }
        };

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
          message:msg,
        });

 */
      }
      catch (ex) {
        console.log(ex);
      }
    }
  };
};
