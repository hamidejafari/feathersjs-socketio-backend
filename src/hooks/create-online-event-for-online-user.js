/* eslint-disable linebreak-style */
const moment = require("jalali-moment");
module.exports = function () {
  return async context => {
    const id = context.id;
    const usersModel = context.app.services.users.Model;
//console.log(context.id);
    if (id !== null) {
      const currentUser = await context.app.service("users").get(id);

      /*
      const currentUser = await usersModel.findOne({
        where: {
          id: id
        }
      });
      */
      //console.log(currentUser);
      if (currentUser.online === 1) {
        //console.log(moment().unix());
        const event = await context.app.service("events").create({
          userId: currentUser.id,
          eventTypeId: 10,
          isChat: true,
          isFace: true,
          isPhone: true,
          start: moment().unix(),
          end: null,
          reservedId: null,
          title: "آنلاین هستم"
        });
        //console.log('111');
      }
    }
  }
}
