const moment = require('jalali-moment');
module.exports = function () {
  return async context => {

    const usersModel = context.app.services.users.Model;
    const pricesModel = context.app.services.prices.Model;
    const globalPrices = await pricesModel.findAll({
      order: [['id', 'DESC']]
    });

    const user = context.params.user;
    const cUser = await usersModel.findOne({
      where:{
        id:user.id
      }
    });

    const subjectPrice = globalPrices[0].subjectPrice;
    let finalPrice = subjectPrice + (subjectPrice * 0.09);

    if(cUser.wallet < finalPrice){
      throw new Error(
        `اعتبار حساب شما برای ارسال پرسش کافی نیست. لطفا حساب خود را حداقل به میزان ${finalPrice} ریال شارژ کنید `);
    }

    const order = await context.app.service('orders').create({
      userId: cUser.id,
      totalPrice: finalPrice * -1,
      payments: finalPrice * -1,
      discount: 0,
      planId: 13,
      quantity: 1,
      status: 1,
      createdAt: moment().unix(),
      updatedAt: moment().unix(),
      description: 'کسر از کیف پول برای ارسال پرسش'
    });

    await context.app.service('users').patch(cUser.id,{
      wallet: cUser.wallet - finalPrice
    });

    context.data.orderId = order.id;

  };
};
