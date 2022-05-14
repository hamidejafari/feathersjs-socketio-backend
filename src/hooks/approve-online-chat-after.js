/* eslint-disable indent */
const moment = require('jalali-moment');
const calculatePrice = require("../functions/calculatePrice");
const axios = require('axios');
module.exports = function () {
  return async context => {
    const usersModel = context.app.services.users.Model;
    const pricesModel = context.app.services.prices.Model;

    const prices = await pricesModel.findAll({
      order: [['id', 'DESC']]
    });

    let eventRequest = context.result;
    const userId = eventRequest.userId;
    const timeNeeded = eventRequest.needed;

    //const user = (await context.app.service('users').get(userId));

    const user = await usersModel.findOne({
      where: {
        id: userId
      }
    });


    let price = calculatePrice(prices, user, timeNeeded, context.result.typeId);

    const wallet = user.wallet;

    let eventId = eventRequest.eventId;

    //delete other requests
    const expiredRequestsQuery = {
      query: {
        $sort: { id: 1 },
        eventId: eventId,
        userId: {
          $ne: userId
        }
      }
    }
    await context.app.service("eventRequests").remove(null, expiredRequestsQuery);

    const order = await context.app.service('orders').create({
      userId: userId,
      totalPrice: price * -1,
      payments: price * -1,
      discount: 0,
      planId: 3,
      quantity: 1,
      status: 1,
      createdAt: moment().unix(),
      updatedAt: moment().unix(),
      description: 'کسر از کیف پول برای رزرو نوبت - آنلاین'
    });


    let eventTypeId = 600;
    let unitPrice = 0;
    switch (eventRequest.typeId) {
      case 1:
        unitPrice = prices[0].chatPrice;
        eventTypeId = 600;
        break;
      case 2:
        unitPrice = prices[0].facePrice;
        eventTypeId = 800;
        break;
      case 3:
        unitPrice = prices[0].callPrice;
        eventTypeId = 700;
        break;
      default:
        unitPrice = prices[0].chatPrice;
        eventTypeId = 600;
    }

    let priceWithoutTax = unitPrice * timeNeeded;


    let tax = priceWithoutTax * 0.1;


    let priceWithTax = priceWithoutTax - tax;

    let income = priceWithTax * 0.75;

    await context.app.service('events').patch(eventId, {
      reservedId: userId,
      orderId: order.id,
      eventTypeId: eventTypeId,
      expertiseId: eventRequest.expertiseId,
      isChat: eventRequest.typeId === 1,
      isFace: eventRequest.typeId === 2,
      isPhone: eventRequest.typeId === 3,
      reserveTime: timeNeeded,
      priceId: prices[0].id,
      unitPrice: unitPrice,
      tax: tax,
      finalIncome: income,
      start: moment(),
      end: moment().add(eventRequest.needed, 'minutes'),
      title: 'درخواست مشاوره آنلاین پذیرفته شد',
      remainingTime: '* ' + eventRequest.needed * 60 + ' *'
    });
    // console.log('1 : ', eventRequest.approvedUserId);

    await context.app.service('users').patch(eventRequest.approvedUserId, {
      online: false
    });

    await context.app.service('users').patch(userId, { online: false, wallet: wallet - price });
    // console.log('2 : ', eventRequest.userId);

    if (eventId !== null) {

      if (context.result.typeId === 1) {
        typeTitle = ' نوشتاری '
      } else if (context.result.typeId === 3) {
        typeTitle = '  تلفنی '
      }

      const messageTitle = ' آنی مشاور - تایید درخواست مشاوره فوری' + typeTitle;
      const messageBody = 'درخواست مشاوره آنلاین شما برای ' +
        context.result.Expertise.title +
        ' توسط مشاور ' +
        context.result.ApprovedUser.name + ' ' + context.result.ApprovedUser.family +
        ' به مدت :  ' +
        context.result.needed +
        '  دقیقه تایید شد  ';

      const token = context.result.RequestUser.firebaseToken;

      try {

        const payload = {
          "content_available": true,
          "priority": "high",
          "data": {
            "text": "hii"
          },
          "to": token,
          "notification": {
            title: messageTitle,
            body: messageBody,
            sound: context.result.RequestUser.userTypeId > 1 ?  'moshaver': 'notification'
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
          userId: context.result.RequestUser.id,
          message: messageBody,
        });

 */
      }
      catch (ex) {
        console.log(ex);
      }
    }
  };
};
