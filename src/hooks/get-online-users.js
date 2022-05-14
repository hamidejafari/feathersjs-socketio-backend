/* eslint-disable linebreak-style,indent */
module.exports = function() {
  return async context => {
    // const sequelize = context.app.get('sequelizeClient');
    const user = context.params.user;
    let query = context.params.query;
    const userTypeModel = context.app.services.userTypes.Model;
    const expertiseUserModel = context.app.services.expertises.Model;
    const filesModel = context.app.services.files.Model
    const expertiseId = query.$expertiseId;
    if (query.$online) {
      delete context.params.query.online;
      delete context.params.query.expertiseId;

      const withExpertise =  {
        include: [
          {
            model: userTypeModel,
            attributes: ["title"],
            where: {
              id: {
                $in: [2, 3]
              }
            }
          },
          {
            model: expertiseUserModel,
            attributes: ["title"],
            where: {
              id: expertiseId
            }
          },
          {
            model: filesModel
          }
        ],
        where: {
          online: 1,
          status:1,
          allowWork:1,
          deletedAt: null
        },
        raw: false
      };

      const withoutExprtise = {
        include: [
          {
            model: userTypeModel,
            attributes: ["title"],
            where: {
              id: {
                $in: [2, 3]
              }
            }
          },
          {
            model: expertiseUserModel,
            attributes: ["title"]
          },
          {
            model: filesModel
          }
        ],
        where: {
          online: 1,
          status:1,
          allowWork:1,
          deletedAt: null
        },
        raw: false
      }
      context.params.sequelize = expertiseId ? withExpertise : withoutExprtise;
    }
     
  }
}
