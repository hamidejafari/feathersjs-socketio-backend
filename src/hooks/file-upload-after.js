module.exports = function () {
  return async context => {
    const title = context.data.title;
    const recordTypeId = context.data.recordTypeId;
    const user = context.params.user;
    const userId  = user ? user.id : context.data.userId;

    const fileName = context.result.id;
    if (title === 'p') {
      await context.app.service('files').patch(
        null,
        {
          status: false
        },
        {
          query: {
            title: title,
            userId: userId
          }
        }
      );
    }

    await context.app.service('files').patch(
      null,
      {
        status: false
      },
      {
        query: {
          userId: userId,
          recordTypeId: recordTypeId
        }
      }
    );

    await context.app.service('files').create({
      userId: userId,
      adminId: userId,
      title: title,
      file: fileName,
      status: 1,
      recordTypeId: recordTypeId,
      url: fileName.substring(0, 5)
    });

    context.result.recordFile = 'http://animoshaver.ir:5050/all-uploads/' + fileName;
  };
};
