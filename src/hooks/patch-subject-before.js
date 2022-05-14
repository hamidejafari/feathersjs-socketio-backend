const moment = require('jalali-moment');
module.exports = function () {
  return async context => {
    const user = context.params.user;
      if(context.data.userIsRead === 0 && context.data.advisorIsRead === 1){
        context.data.answeredAt = moment();
      }
  };
};
