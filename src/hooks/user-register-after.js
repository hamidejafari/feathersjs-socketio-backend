module.exports = function () {
  return async context => {
    const query = {query: {$sort: {id: 1}, mobile: context.data.mobile}};
    const user = (await context.app.service('users').find(query)).data[0];
    const id = user.id;
    const expertises = context.data.expertises;
    expertises.forEach(async element => {
      await context.app.service('expertiseUser').create({
        userId: id,
        expertiseId: element
      });
    });
  };
};
