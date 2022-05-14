/* eslint-disable no-unused-vars */
const axios = require('axios');
module.exports = function () {
  return async context => {
    const userId = context.data.userId;
    const eventId = context.data.eventId;
    const documentId = context.data.documentId;

    const event = (await context.app.service('events').get(eventId));
    //console.log(event);

    let token = '';
    let sender = '';
    let uId = -1;
    let sound = 'moshaver';
    if (event.userId !== userId) {
      token = event.EventUser.firebase_token;
      uId = event.EventUser.id;
      sender = event.ReservedUser.name + ' ' + event.ReservedUser.family;
      sound = 'notification';
    }

    if (event.reservedId !== userId) {
      token = event.ReservedUser.firebase_token;
      uId = event.ReservedUser.id;
      sender = event.EventUser.name + ' ' + event.EventUser.family;
      sound = 'moshaver';
    }


    try {

      const body = sender + ' یک پیغام برای شما ارسال کرده است ';
      const payload = {
        'content_available': true,
        'priority': 'high',
        'data': {
          'text': 'hii'
        },
        'to': token,
        'notification': {
          title: 'آنی مشاور',
          body: body,
          sound: sound
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
        userId: uId,
        message: body,
      });
       */
    } catch (ex) {
      console.log(ex);
    }
  };
};
