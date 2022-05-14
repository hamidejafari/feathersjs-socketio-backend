/* eslint-disable linebreak-style,indent */
module.exports = function () {
  return async context => {
    const userTypeModel = context.app.services.userTypes.Model;
    const expertiseUserModel = context.app.services.expertises.Model;

    context.params.sequelize = {
      include: [
        {
          model: userTypeModel,
          attributes:
            [
              'title'
            ]
        },
        {
          model: expertiseUserModel,
          attributes:
            [
              'title'
            ]
        }
      ],
      raw: false
    };
  };
};
