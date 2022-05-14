const moment = require('jalali-moment');
module.exports =  () =>  {
  return async context => {
    let approvedUserId = context.result.userId;
    let eventRequestid = context.result.requestId;
    let date = moment();
    await context.app.service('eventRequests').patch(eventRequestid,{
      approvedUserId:approvedUserId,
      approveDate: date
    });
  };
};
