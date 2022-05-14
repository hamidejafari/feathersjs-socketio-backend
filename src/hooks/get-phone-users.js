module.exports = function() {
  return async context => {
    const sequelize = context.app.get("sequelizeClient");
    let query = context.params.query;
    if (query.$phone) {
      const expertiseId = query.$expertiseId;
      delete context.params.query.phone;
      delete context.params.query.expertiseId;
      const userTypeModel = context.app.services.userTypes.Model;
      const expertiseUserModel = context.app.services.expertises.Model;
      const eventModel = context.app.services.events.Model;
      const userFilesModel = context.app.services.files.Model;
      context.params.sequelize = {
        include: [
          {
            model: userTypeModel,
            attributes: ["title"],
            where: { id: { $in: [2, 3] } }
          },
          {
            model: expertiseUserModel,
            attributes: ["title"],
            where: { id: expertiseId }
          },
          {
            model: eventModel,
            as: "events",
            where: { isPhone: 1, eventTypeId: 0 }
          }
        ],
        where: {
          status:1,
          allowWork:1,
          deletedAt: null
        },
        raw: false
      };
    }
  };
};
