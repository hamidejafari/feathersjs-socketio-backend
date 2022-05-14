let moment = require('jalali-moment');
module.exports = function () {
  return async context => {
    const query = {query: {$sort: {id: 1}, mobile: context.data.mobile}};
    const user = (await context.app.service('users').find(query)).data[0];
    if(user !== undefined) {
      //console.log(user);

      const id = user.id;
      const paySave = 300000;
      const discount = 300000;
      let payments = paySave - discount;

      await context.app.service('orders').create({
        userId: id,
        totalPrice: paySave,
        payments: payments,
        discount: discount,
        planId: 1,
        quantity: 1,
        status: 1,
        createdAt: moment().unix(),
        updatedAt: moment().unix(),
        description: '50 هزار تومان هدیه ثبت نام - شارژ کیف پول'
      });

    }
  };
};
