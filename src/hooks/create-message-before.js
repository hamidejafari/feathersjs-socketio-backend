module.exports = function () {
  return async context => {
    const user = context.params.user;

    context.data.userFullName = user.firstName + ' ' + user.lastName;

    const eventId = context.data.eventId;
    const documentId = context.data.documentId ;
    if(documentId !== null) {
      const query = {
        query: {
          $sort: {id: 1},
          eventId: eventId,
          documentId: documentId
        }
      };
      const messagesData = (await context.app.service('messages').find(query)).data;
      if (messagesData.length > 0) {
        throw new Error('فایل قبلا ارسال شده است');
      }
    }
  };
};
