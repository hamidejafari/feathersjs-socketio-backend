const Sequelize = require('sequelize');
const calculatePrice = require("../functions/calculatePrice");

module.exports = function () {
  return async context => {
    const { Op } = Sequelize;
    const usersModel = context.app.services.users.Model;
    const eventRequestsModel = context.app.services.eventRequests.Model;
    const eventsModel = context.app.services.events.Model;
    const pricesModel = context.app.services.prices.Model;

    const prices = await  pricesModel.findAll({
      order: [['id', 'DESC']]
    });


    const user = context.params.user;
    const wallet = user.wallet;
    const eventUserId = context.data.userId;
    context.data.userId = user.id;
    const timeNeeded = context.data.needed;
    


    onlineEvent = await eventsModel.findOne({
      where: {
        [Op.or]: [{ userId: user.id }, { reservedId: user.id }],
        eventTypeId: {
          [Op.in]: [600, 700]
        }
      }
    });
    // console.log(onlineEvent);

    if (onlineEvent !== null) {
      throw new Error("شما در حال حاضر مشاوره فعال دارید");
    }


    const currentUser = await usersModel.findOne({
      where: {
        id: user.id
      }
    });

    if (currentUser.walletChange) {
      throw new Error("اعتبار شما در حال بروز رسانی است"); //credit not updated
    }

    let price = calculatePrice(prices,user,timeNeeded,context.data.typeId);

    // console.log(price);

    if (wallet < price) {
      throw new Error(
        "اعتبار حساب شما کافی نیست لطفا در بخش پروفایل حساب خود را شارژ کنید"
      ); //credit is not enough
    }

    if (user.id === eventUserId) {
      throw new Error("امکان ارسال درخواست وجود ندارد"); //user can not request for him/herself
    } else {

      await eventRequestsModel.destroy({
        where: {
          userId: user.id,
          approveDate: null,
          deletedAt: null
        }
      });

      if (eventUserId !== null) {

        const event = await eventsModel.findOne({
          where: {
            userId: eventUserId,
            eventTypeId: 10,
            reservedId: null
          }
        });
        if (event !== null) {
          context.data.eventId = event.id;
        } else {
          throw new Error("مشاور از دسترس خارج شده است"); //event already reserved
        }
      }

    }
  };
};
