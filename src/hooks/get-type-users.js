const Sequelize = require('sequelize');
module.exports = function () {
  return async context => {
    const sequelize = context.app.get('sequelizeClient');
    const { Op } = Sequelize;
    let query = context.params.query;
    if (query.$type) {
      const expertiseId = query.$expertiseId;
      const isChat = query.$isChat;
      const isPhone = query.$isPhone;
      const isFace = query.$isFace;
      const name = query.$name;
      const family = query.$family;

      delete context.params.query.type;
      delete context.params.query.isChat;
      delete context.params.query.isFace;
      delete context.params.query.isPhone;
      delete context.params.query.name;
      delete context.params.query.family;

      delete context.params.query.expertiseId;
      const userTypeModel = context.app.services.userTypes.Model;
      const expertiseUserModel = context.app.services.expertises.Model;
      const eventModel = context.app.services.events.Model;
      const filesModel = context.app.services.files.Model;

      const withoutNameWhere = {
        status: 1,
        allowWork: 1,
        deletedAt: null
      };

      const withNameWhere = {
        status: 1,
        allowWork: 1,
        deletedAt: null,
        family: { [Op.like]: '%' + family + '%' }
      };


      const qParameters = expertiseId ? {
        include: [
          {
            model: userTypeModel,
            attributes: ['title'],
            where: { id: { $in: [2, 3] } }
          },
          {
            model: expertiseUserModel,
            attributes: ['title'],
            where: { id: expertiseId }
          },
          {
            model: filesModel
          }
        ],
        where: name || family  ? withNameWhere : withoutNameWhere,
        raw: false
      } : {
        include: [
          {
            model: userTypeModel,
            attributes: ['title'],
            where: { id: { $in: [2, 3] } }
          },
          {
            model: filesModel
          }
        ],
        where: name || family  ? withNameWhere : withoutNameWhere,
        raw: false
      };

      context.params.sequelize = qParameters;
    }
  };
};
