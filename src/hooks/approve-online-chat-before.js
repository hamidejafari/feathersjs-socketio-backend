/* eslint-disable no-unused-vars */
const moment = require('jalali-moment');
const calculatePrice = require("../functions/calculatePrice");
module.exports = function () {
  return async context => {
    const sequelize = context.app.get("sequelizeClient");
    const eventRequestsModel = context.app.services.eventRequests.Model;
    const usersModel = context.app.services.users.Model;
    const eventsModel = context.app.services.events.Model;
    const pricesModel = context.app.services.prices.Model;

    const prices = await  pricesModel.findAll({
      order: [['id', 'DESC']]
    });

    const id = context.id;

    const request = await eventRequestsModel.findOne({
      where: {
        id: id
      }
    });

    if (request !== null) {

      if (request.approvedUserId === null) {
        const userId = request.userId;
        const timeNeeded = request.needed;
       
        const user = await usersModel.findOne({
          where: {
            id: userId
          }
        });

        let price = calculatePrice(prices,user,timeNeeded,request.typeId);
 

        const wallet = user.wallet;
        if (wallet >= price) {
          let eventId = request.eventId;
          if (eventId === null) {
            const event = await eventsModel.findOne({
              where: {
                userId: context.data.approvedUserId,
                eventTypeId: 10
              }
            });
            context.data.eventId = event.id;
          }
        } else {
          context.result = {
            msg: 'اعتبار کاربر کافی نیست'
          }
        }
      } else {
        context.result = {
          msg: 'درخواست قبلا تایید شده است'
        }
      }
    } else {
      context.result = {
        msg: 'درخواستی وجود ندارد'
      }
    }
  };
};
