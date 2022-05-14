module.exports = function () {
  return async context => {
    const usersModel = context.app.services.users.Model;
    const src = context.params.query.src;

    delete context.params.query.src;
    const dst = context.params.query.dst;

    delete context.params.query.dst;

    delete context.params.query.unique_id;
    delete context.params.query.data;
    delete context.params.query.app_name;


    context.params.query.eventTypeId = 700;

    const advisor = await usersModel.findOne({
      where: {
        mobile: src,
      }
    });
    //context.params.query.userId = advisor.id;

    const user = await usersModel.findOne({
      where: {
        mobile: dst,
      }
    });
    context.params.query.reservedId = user.id;

    //console.log('input');
    return context;
  };
};
