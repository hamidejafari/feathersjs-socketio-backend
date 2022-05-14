module.exports = function() {
  return async context => {
    const sequelize = context.app.get("sequelizeClient");
    let query = context.params.query;
    if (query.$all) {
      const expertiseId = query.$expertiseId;
      delete context.params.query.expertiseId;
      delete context.params.query.all;
      const userTypeModel = context.app.services.userTypes.Model;
      const expertiseUserModel = context.app.services.expertises.Model;
      const filesModel = context.app.services.files.Model
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
            model: filesModel
          }
        ],
        where: {
          status: 1,
          allowWork: 1,
          deletedAt: null
        },
        raw: false
      };
    }
  };
};
