const axios = require('axios');
module.exports = function () {
  return async context => {
    const usersModel = context.app.services.users.Model;

    let typeTitle = '';
    if (context.result.typeId === 1) {
      typeTitle = ' نوشتاری ';
    } else if (context.result.typeId === 3) {
      typeTitle = '  تلفنی ';
    }

    let messageTitle = ' آنی مشاور - در خواست مشاوره' + typeTitle;
    let messageBody = '';

    if (!context.result.RequestEvent) {
      const expertiseId = context.result.expertiseId;
      const userExpertisesQuery = {
        query: {
          expertiseId: expertiseId
        }
      };
      const userExpertises = (await context.app.service('expertiseUser').find(userExpertisesQuery)).data;
      //console.log(userExpertises);
      userExpertises.forEach(async element => {
        let allow1 = element.User.firebase_token !== '' && element.User.firebase_token !== null

        if (allow1 && element.User.online === 1) {

          messageBody = context.result.RequestUser.name + ' ' + context.result.RequestUser.family + '  ' + 'یک در خواست مشاوره آنلاین در سبد مشاوران قرار داده است' + ' : ' + element.Expertise.title;
          //console.log(element.User);


          try {


            const payload = {
              "content_available": true,
              "priority": "high",
              "data": {
                "text": "hii"
              },
              "to": element.User.firebase_token,
              "notification": {
                title: messageTitle,
                body: messageBody,
                sound: 'moshaver'
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
              userId: element.User.id,
              message: messageBody,
            });

 */
          }
          catch (ex) {
            console.log(ex);
          }
        }
      });

    } else {

      const user = await usersModel.findOne({
        where: {
          id: context.data.userId
        }
      });

      if (user !== null) {
        messageTitle = ' آنی مشاور - در خواست مشاوره' + typeTitle;
        messageBody = user.name + ' ' + user.family + '  از شما درخواست  جلسه مشاوره بعنوان  ' +
          context.result.Expertise.title + ' به مدت : ' + context.result.needed + '  دقیقه دارد .';

        try {

          const payload = {
            "content_available": true,
            "priority": "high",
            "data": {
              "text": "hii"
            },
            "to": context.result.RequestEvent.EventUser.firebase_token,
            "notification": {
              title: messageTitle,
              body: messageBody,
              sound: 'moshaver'
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
            userId: context.result.RequestEvent.EventUser.id,
            message: messageBody,
          });
 */
        }
        catch (ex) {
          console.log(ex);
        }

      }
    }
  };
};
