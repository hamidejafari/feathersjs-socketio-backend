const moment = require('jalali-moment');
const generateCode = require("../functions/generateCode");
const Sequelize = require('sequelize');
const { Op } = Sequelize;
const changeDigits = require("../functions/changeDigits");
const mobileValidate = require("../functions/mobileValidate");

module.exports = function () {
  return async context => {
    const usersModel = context.app.services.users.Model;


    const mobile = context.data.mobile;
    const email = mobile + '@email.com';
    const refId = context.data.refId;

    const englishMobile = changeDigits(mobile);

    if(!mobileValidate(englishMobile)){
      throw new Error('شماره موبایل نامعتبر است');
    }

    const existingUser = await usersModel.findOne({
      where: {
        [Op.or]: [{ email: email }, { mobile: mobile }],
        deletedAt: null
      }
    });

    if (existingUser !== null) {
      throw new Error('شماره موبایل یا ایمیل تکراری است');
    }


    const existingRefUser = await usersModel.findOne({
      where: {
        id: refId
      }
    });
    if (existingRefUser === null) {
      context.data.refId = 450;
    }


    const expertises = context.data.expertises;
    if (expertises.length > 3) {
      throw new Error('تعداد تخصص های انتخاب شده بیش از سه تخصص است');
    }

    context.data.mobileConfirm = 0
    context.data.allowWork = context.data.userTypeId === 1 ? 1 : 0;
    // context.data.status = context.data.userTypeId === 1 ? 1 : 0;
    context.data.wallet = 300000;
    context.data.createdAt = moment().unix();
    context.data.updatedAt = moment().unix();
    context.data.confirmCode = generateCode();
  };

};
