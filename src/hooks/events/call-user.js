module.exports = function () {
  return async context => {
    const eventsModel = context.app.services.events.Model;
    const usersModel = context.app.services.users.Model;
    const axios = require('axios');
    if (context.params.query && context.params.query.call) {
      const event = await eventsModel.findOne({
        where: {
          id: context.id,
          eventTypeId: 700
        }
      });

      if (event) {
        const user = await usersModel.findOne({
          where: {
            id: event.reservedId,
          }
        });

        const advisor = await usersModel.findOne({
          where: {
            id: event.userId,
          }
        });

        const url = `http://77.238.122.56/api/v1/originate/call/?caller=${advisor.mobile}&callee=${user.mobile}&context=main_routing&trunk_name=2191306075&caller_id=2191306075`;
        await axios.get(url, {
          auth: {
            username: 'wemoshaver',
            password: 'F0rd465$'
          }
        });
      }

    }

    return context;
  };
};
