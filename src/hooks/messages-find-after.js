/* eslint-disable no-unused-vars,no-console */
const sequelize = require('sequelize');
module.exports = function () {
  return async context => {
    let myResult = [];
    //console.log(context.result);
    context.result.data.forEach(async element => {
      if (element.userFullName === null) {
        const user = (await context.app.service('users').get(element.userId));
        //console.log(user);
        const userFullName = user.name + ' ' + user.family;

        myResult.push({
          messageBody: element.messageBody,
          userId: element.userId,
          userFullName: userFullName,
          messageTypeId: element.messageTypeId,
          messageSourceId: element.messageSourceId,
          documentId: element.documentId,
          documentUrl: element.documentUrl,
          eventId: element.eventId,
          createdAt: element.createdAt,
          updatedAt: element.updatedAt
        });
      } else {
        myResult.push(element);
      }
      // console.log(result);
    });
    context.result.data = myResult;
    console.log(myResult);
    //console.log(context.result);
  };
};
