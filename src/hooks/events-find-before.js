/* eslint-disable indent */
module.exports = function () {
  return async context => {
    //const sequelize = context.app.get('sequelizeClient');
    const userModel = context.app.services.users.Model;
      context.params.sequelize = {
        include: [{ model: userModel }]
      };
      //console.log( context.params.sequelize);

  };
};
