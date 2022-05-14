module.exports = function () {
    return async context => {
        const user = context.params.user;
        context.data.adminId = user.id;
    };
};