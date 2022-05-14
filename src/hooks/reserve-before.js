const calculatePrice = require("../functions/calculatePrice");
const moment = require('jalali-moment');

module.exports = function () {
  return async context => {
    const usersModel = context.app.services.users.Model;
    const eventsModel = context.app.services.events.Model;
    const ordersModel = context.app.services.orders.Model;
    if (context.data.eventTypeId === null) {
      delete context.data.eventTypeId;

      //const user = context.params.user;
      const userId = context.data.reservedId
      const eventId = context.id;
      if (eventId !== null) {

        const event = await eventsModel.findOne({
          where: {
            id: eventId
          }
        });

        const otherReservedEvent = await eventsModel.findOne({
          where: {
            start: event.start,
            end: event.end,
            reservedId: userId,
            eventTypeId: 0
          }
        })

        if (otherReservedEvent !== null) {
          throw new Error('0');//with more then one expert
        }

        if (event.userId === userId) {
          throw new Error('1');//reserve from myself
        } else if (event.reservedId === userId) {
          throw new Error('2');//reserved by you
        } else if (event.reservedId !== null) {
          throw new Error('3');//reserved by others
        }

        const currentUser = await usersModel.findOne({
          where: {
            id: userId
          }
        });

        //console.log(currentUser);
        if (currentUser.walletChange) {
          throw new Error('4');//credit not updated
        } else {
          const pricesModel = context.app.services.prices.Model;
          const prices = await pricesModel.findAll({
            order: [['id', 'DESC']]
          });

          let typeId = 0;
          let unitPrice = 0;
          //console.log(context.data);
          //console.log(context.data.isPhone);
          if (context.data.isChat === true) {
            typeId = 1;
            unitPrice = prices[0].chatPrice;
          } else if (context.data.isPhone === true) {
            typeId = 3;
            unitPrice = prices[0].callPrice;
          } else if (context.data.isFace === true) {
            unitPrice = prices[0].facePrice;
            typeId = 2;
          }

//console.log(typeId);
//console.log(unitPrice);
          let price = calculatePrice(prices, currentUser, 30, typeId);
          const wallet = currentUser.wallet;

          context.data.reservedFullName = currentUser.name + ' ' + currentUser.family;

          if (wallet >= price) {

            const order = await ordersModel.create({
              userId: currentUser.id,
              totalPrice: price * -1,
              payments: price * -1,
              discount: 0,
              planId: 3,
              quantity: 1,
              status: 1,
              createdAt: moment().unix(),
              updatedAt: moment().unix(),
              description: 'کسر از کیف پول برای رزرو نوبت '
            });

            let priceWithoutTax = unitPrice * 30;
            let tax = priceWithoutTax * 0.1;
            let priceWithTax = priceWithoutTax - tax;
            let income = priceWithTax * 0.75;

            context.data.orderId = order.id;
            context.data.priceId =  prices[0].id;
            context.data.unitPrice = unitPrice;
            context.data.tax =  tax;
            context.data.finalIncome = income;


            (await context.app.service('users').patch(currentUser.id, { wallet: wallet - price }));
          } else {
            throw new Error('5');//credit is not enough
          }
        }
      }
    }
  }
};
