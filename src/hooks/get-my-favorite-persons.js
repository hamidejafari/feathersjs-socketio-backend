module.exports = function () {
    return async context => {
        const user = context.params.user;
        if (context.params.query.$myFavorites) {
            delete context.params.query.$myFavorites;
            context.params.query.userId = user.id;
        }
    }
};
 