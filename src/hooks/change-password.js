const axios = require('axios');
module.exports = function () {
    return async context => {
      const user = context.params.user;
      if (context.data.$changePassword) {
          delete context.data.$changePassword;

          let mobile = user.mobile;
          let msg = ' رمز ورود شما به پنل تغییر کرده است . رمز جدید ' + context.data.password + ' می باشد. آنی مشاور  ';

          try {
            const sendResult = await axios.post('https://rest.payamak-panel.com/api/SendSMS/SendSMS', {
              username: 'law8516',
              password: '8516',
              to: mobile,
              from: '2188321088',
              text: msg,
      
            });
      
             // console.log('change password msg sent to : ', mobile);
          }
          catch (ex) {
            console.log(ex);
          }
      }
    };
  };