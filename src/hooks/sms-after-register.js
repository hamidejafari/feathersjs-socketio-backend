const axios = require('axios');
const Kavenegar = require('kavenegar');
module.exports = function () {
  return async context => {
    let mobile = context.data.mobile;
    // let code = 'کاربر گرامی کد تایید شما  ' + context.data.confirmCode + ' می باشد. آنی مشاور  ';


    // try {
    /*
    const sendResult = await axios.post('https://rest.payamak-panel.com/api/SendSMS/SendSMS', {
      username: 'law8516',
      password: '8516',
      to: mobile,
      from: '2188321088',
      text: code,

    });
    */

    const api = Kavenegar.KavenegarApi({
      apikey: '5851696C716C452B7943595A45765152557476416B36797458426D534244447462636D557847683875664D3D'
    });

    api.VerifyLookup({
      receptor: mobile,
      token: context.data.confirmCode,
      template: 'verfiy'
    }, function (response, status) {
      //console.log(response);
      // console.log(status);
    });



    // console.log('confirm code sent to : ', mobile);
    //}
    //catch (ex) {
    //console.log(ex);
    //}
  };
};