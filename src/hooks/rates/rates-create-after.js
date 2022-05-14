module.exports = function () {
  return async context => {
    const user = context.params.user;
    const sequelize = context.app.get('sequelizeClient');
    const usersModel = context.app.services.users.Model;
    const eventsModel = context.app.services.events.Model;
    const ratesModel = context.app.services.rates.Model;
    //const eventUser = await Model.findOne({
    //    where: {id: context.result.eventId}
    //});

    //if(eventUser !== null){
    //    const events =
    // }

  };
};
