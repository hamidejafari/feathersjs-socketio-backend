const moment = require('jalali-moment');
const _ = require('lodash')
const Sequelize = require('sequelize');
const { Op } = Sequelize;
module.exports = function () {
  return async context => {

    throw new Error('غیر فعال');

    const user = context.params.user;
    const usersModel = context.app.services.users.Model;
    const conversationsModel = context.app.services.conversations.Model;

    const cUser = await usersModel.findOne({
      where: {
        id: user.id
      }
    });

    const userId = cUser.userTypeId === 1 ? cUser.id : context.data.receiverId;
    const advisorId = cUser.userTypeId > 1 ? cUser.id : context.data.receiverId;

    const conversation = await conversationsModel.findOne({
      where: {
        advisorId: advisorId,
        userId: userId
      }
    });

    if (conversation) {
      await context.app.service('conversations').patch(conversation.id, {
        userId: userId,
        advisorId: advisorId,
        userIsRead: cUser.id === userId ? 1 : 0,
        advisorIsRead: cUser.id === advisorId ? 1 : 0
      });
    } else {
      if (cUser.questionCountRemained < cUser.maxQuestionCountAllowed) {
        conversation = await context.app.service('conversations').create({
          userId: userId,
          advisorId: advisorId,
          userIsRead: cUser.id === userId ? 1 : 0,
          advisorIsRead: cUser.id === advisorId ? 1 : 0
        });
      } else {
        context.data.message = 'سقف ارسال پرسش برای کاربر خاتمه یافته است'
      }
    }

    await context.app.service('users').patch(cUser.id, {
      questionCountRemained: cUser.questionCountRemained + 1,
    });

    context.data.conversationId = conversation.id;
  };
};
