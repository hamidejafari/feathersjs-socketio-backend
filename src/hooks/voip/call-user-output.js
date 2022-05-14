module.exports = function () {
  return async context => {
    const usersModel = context.app.services.users.Model;
    let callLimit = '0';
    let extension = '';
    if (context.result.data.length > 0) {
      callLimit = context.result.data[0].remainingTime.split('*').join('').trim();

      const user = await usersModel.findOne({
        where: {
          id: context.result.data[0].reservedId,
        }
      });
      extension = user.mobile;
    }

    context.result = {ok: 1, trunk: '2191306075', extension: extension, call_limit: callLimit};

    return context;
  };
};
