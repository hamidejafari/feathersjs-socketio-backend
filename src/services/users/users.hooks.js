/* eslint-disable linebreak-style */
const { authenticate } = require("@feathersjs/authentication").hooks;
const {
  hashPassword,
  protect
} = require("@feathersjs/authentication-local").hooks;

//const { fastJoin } = require('feathers-hooks-common');
const setUserCredit = require("../../hooks/set-user-credit");
const userRegisterAfter = require("../../hooks/user-register-after");
const smsAfterRegister = require("../../hooks/sms-after-register");
const userRegisterBefore = require("../../hooks/user-register-before");
const { iff } = require("feathers-hooks-common");
const hasNotExtraExpertises = () => context =>
  context.data.expertises.length <= 3;
const getOnlineUsers = require("../../hooks/get-online-users");
const getIssueUsers = require("../../hooks/get-issue-users");
const getChatUsers = require("../../hooks/get-chat-users");
const getFaceUsers = require("../../hooks/get-face-users");
const getPhoneUsers = require("../../hooks/get-phone-users");
const getAllUsers = require("../../hooks/get-all-users");
const getTypeUsers = require("../../hooks/get-type-users");
//const getUserAssocations = require('../../hooks/get-user-assocations');
const createOnlineEventForOnlineUser = require("../../hooks/create-online-event-for-online-user");
const removeOnlineEventForOfflineUser = require("../../hooks/remove-online-event-for-offline-user");
const afterLogin = require("../../hooks/after-login");
const confirmUser = require("../../hooks/confirm-user");
const checkOpenEvent = require("../../hooks/check-open-event");
const changePassword = require("../../hooks/change-password");
const preventNotAllowedAdvisors = require("../../hooks/prevent-not-allowed-advisors");
/*
const userResolvers = {
  joins: {
    avatar: () => async (user, context) => {
      user.avatar = '';
      const files = (await context.app.service('files').find({
        query: {
          userId: user.id,
          title: 'p'
        }
      })).data;
      if(files.length === 1){
        user.avatar = files[0].file;
      }
    },
    fullName: () => user => { user.fullName = user.name + ' ' + user.family; },
    UserType: () => async (user, context) => {
      user.UserType = (await context.app.service('userTypes').find({
        query: {
          id: user.userTypeId
        }
      })).data[0];
    },
    Expertises: () => async (user, context) => {
      user.Expertises = (await context.app.service('expertise-user').find({
        query: {
          userId: user.id
        }
      })).data;
    }
  }
};

const query = {
  UserType: true,
  Expertises: true,
  fullName: ['fullName'],
  avatar: ['avatar']
};

*/

module.exports = {
  before: {
    all: [],
    find: [
      //authenticate('jwt'),
      getOnlineUsers(),
      getIssueUsers(),
      getChatUsers(),
      getFaceUsers(),
      getPhoneUsers(),
      getAllUsers(),
      getTypeUsers()
    ],
    get: [
      //authenticate('jwt'),
    ],
    create: [userRegisterBefore(), hashPassword()],
    update: [hashPassword(), authenticate("jwt")],
    patch: [
      authenticate("jwt"),
      hashPassword(), 
      changePassword(),
      confirmUser(),
      preventNotAllowedAdvisors(),
      checkOpenEvent()
    ],
    remove: [authenticate("jwt")]
  },

  after: {
    all: [protect("password")],
    find: [
      protect("password", "mobile", "email","telegramId")
      //fastJoin(userResolvers, query)
    ],
    get: [
      //fastJoin(userResolvers, query),
      afterLogin()
    ],
    create: [
      iff(hasNotExtraExpertises(), userRegisterAfter()),
      setUserCredit(),
      smsAfterRegister(),
    ],
    update: [],
    patch: [
      createOnlineEventForOnlineUser(),
      removeOnlineEventForOfflineUser(),
      afterLogin()
    ],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
