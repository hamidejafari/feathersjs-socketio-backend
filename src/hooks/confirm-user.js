const axios = require('axios');
const Sequelize = require('sequelize');
const changeDigits = require('../functions/changeDigits');
module.exports = function () {
  return async context => {
    const user = context.params.user;
    const sequelize = context.app.get('sequelizeClient');
    const { Op } = Sequelize;
    const usersModel = context.app.services.users.Model;
    if (context.data.$confirmThisPerson) {
      delete context.data.$confirmThisPerson;
      const code = changeDigits(context.data.confirmCode);

      const result = await usersModel.findOne({
        where: {
          id: user.id,
          confirmCode: code
        }
      });



      if (result === null) {
        throw new Error('کد فعال سازی ارسال شده معتبر نیست');
      }
      else {
        context.data.mobileConfirm = 1;

        /*

                                try {

                                    const bossUser = await usersModel.findOne({
                                        where: {
                                            id: 450
                                        }
                                    });

                                    const ahmadUser = await usersModel.findOne({
                                        where: {
                                            id: 336
                                        }
                                    });


                                    const userCount = await usersModel.count({
                                        where: {
                                            userTypeId: 1
                                        }
                                    });

                                    const advisorCount = await usersModel.count({
                                        where: {
                                            'userTypeId': { [Op.gt]: 1 }
                                        }
                                    });

                                    const title = 'آنی مشاور آمار مدیریتی';
                                    const body = 'تعداد مشاور : ' + advisorCount + '  تعداد کاربر : ' + userCount

                                    const payload1 = {
                                        title: 'آنی مشاور آمار مدیریتی',
                                        body: body,
                                        token: bossUser.firebaseToken
                                    };

                                    const payload2 = {
                                        title: 'آنی مشاور آمار مدیریتی',
                                        body: body,
                                        token: ahmadUser.firebaseToken
                                    };

                                    await axios({
                                        method: 'post',
                                        baseURL: 'http://animoshaver.ahmadmk.ir',
                                        timeout: 10000,
                                        url: '/fcm-send',
                                        data: payload1
                                    });

                                    await axios({
                                        method: 'post',
                                        baseURL: 'http://animoshaver.ahmadmk.ir',
                                        timeout: 10000,
                                        url: '/fcm-send',
                                        data: payload2
                                    });

                                }
                                catch (ex) {
                                    console.log(ex);
                                }
                */
      }
    }
  };
};
