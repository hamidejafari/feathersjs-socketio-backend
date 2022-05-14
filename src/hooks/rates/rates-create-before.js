module.exports = function () {
  return async context => {
    const user = context.params.user;
    context.data.userId = user.id;

    if (context.data.$event) {
      delete context.data.$event;
      context.data.ratableType = 'App\\Models\\Event';
    }
  };
};
