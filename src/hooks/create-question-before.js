const moment = require('jalali-moment');
module.exports = function () {
  return async context => {
    const user = context.params.user;

    context.data.senderId = user.id;
    context.data.createdAt = moment().unix();
    context.data.updatedAt = moment().unix();
  };
};
