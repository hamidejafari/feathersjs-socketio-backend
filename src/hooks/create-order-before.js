var moment = require('jalali-moment');
var soap = require('soap');
module.exports = function () {
  return async context => {
    /*
    console.log(999);
    const url = 'https://bpm.shaparak.ir/pgwchannel/services/pgw?wsdl';
    let args = {
        terminalId: 3548495,
        userName: 'a577',
        userPassword: '58613540',
        orderId: 50012,
        amount: 1000,
        localDate: '20190612',
        localTime: '14:30',
        additionalData: '',
        callBackUrl: '/',
        payerId: '0'
    };
    soap.createClient(url, function (err, client) {
        client.bpPayRequest(args, function (err, result) {
            console.log(result);
            console.log(err);
        });
    });
    */

    const user = context.params.user;
    if (user !== undefined) {
      context.data = {
        userId: user.id,
        totalPrice: context.data.totalPrice,
        discount: 0,
        payments: context.data.totalPrice,
        planId: 1,
        quantity: 1,
        status: 0,
        description: 'شارژ کیف پول ',
        createdAt: moment().unix(),
        updatedAt: moment().unix()
      };
    }
  };
};
