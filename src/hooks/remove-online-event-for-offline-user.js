/* eslint-disable linebreak-style,indent */
module.exports = function () {
  return async context => {
    const userId = context.id;
    if (userId !== null) {
      // console.log('user ', userId, 'patched. 1');
      if (userId !== null) {
        const currentUser = (await context.app.service('users').get(userId));
        if (currentUser.online === 0) {
          await (context.app.service('events').remove(null, {
            query: {
              userId: currentUser.id,
              eventTypeId: 10
            }
          }));
          // console.log('user ', currentUser.id, 'patched. 2');
        }
      }
    }
  };
};
