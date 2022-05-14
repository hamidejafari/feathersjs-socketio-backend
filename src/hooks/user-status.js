module.exports = function () {
  return async context => {
    const userId = context.data.userId;
    //console.log(context.params);
    if (context.data.eventTypeId === 10) {
      //console.log(userId);
      const eq = {
        query: {
          eventTypeId : 10,
          userId: userId,
          reservedId: null
        }
      };
      //console.log(eq);
      const ed = (await context.app.service('events').find(eq)).data;
      if(ed.length > 0){
        //throw new Error('وضعیت شما آنلاین است'); //duplicate online status
        // context.result = {
        //   message: 'وضعیت شما آنلاین است'
        // }
      }
      
    }
  };
};
