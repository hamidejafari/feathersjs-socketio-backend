const _ = require('lodash');
module.exports = function () {
  return async context => {
    const eventsModel = context.app.services.events.Model;

    let query = context.params.query;
    if (query.$advisorId) {
      const advisorId = query.$advisorId;
      delete context.params.query.advisorId;

      const advisorEvents = await eventsModel.findAll({
        attributes: ['id'],
        where:
          { userId: advisorId },
        raw: true
      });

      const eventIds = _.map(advisorEvents, 'id');

      context.params.sequelize = {
        where: {
          ratableId:{
            '$in' : eventIds
          },
          approvedAdminId:{
            '$ne':null
          }
        },
        raw: false
      };

    }

    return context;
  };
};
