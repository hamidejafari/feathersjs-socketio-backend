const moment = require('jalali-moment');
module.exports = function () {
  return async context => {
    context.data.createdAt =  moment().unix();
    context.data.updatedAt =  moment().unix();
  };
};
