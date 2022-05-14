/* eslint-disable linebreak-style,indent */
const _ = require('lodash')
const Sequelize = require('sequelize');
const { Op } = Sequelize;
module.exports = function () {
  return async context => {

    const cUser = context.params.user;

    const recordTypesModel = context.app.services.recordTypes.Model;
    const expertisesModel = context.app.services.expertises.Model;
    const filesModel = context.app.services.files.Model;
    const eventsModel = context.app.services.events.Model;
    const ratesModel = context.app.services.rates.Model;
    const likesModel = context.app.services.likes.Model;
    const routesModel = context.app.services.routes.Model;
    const pricesModel = context.app.services.prices.Model;
    const servicesModel = context.app.services.services.Model;
    const questionsModel = context.app.services.questions.Model;

    const id = context.id;
    if (id !== null) {
      const user = context.result;
      if (!user) return;

      if (user.deletedAt !== null) {
        throw new Error('This user has been deleted');
      }

      const globalPrices = await pricesModel.findAll({
        order: [['id', 'DESC']]
      });

      const myFinishedEvents = await eventsModel.findAll({
        attributes: ['id'],
        where:
        {
          reservedId: user.id,
          eventTypeId: { $in: [100, 110, 120] }
        }
      });

      if (myFinishedEvents.length > 0) {
        context.result.allowTrial = false;
      } else {
        context.result.allowTrial = true;
      }


      const myEvents = await eventsModel.findAll({
        attributes: ['id'],
        where:
          { userId: user.id },
        raw: true
      });

      const ratesCount = await ratesModel.count({
        where: {
          ratableId:
            { [Op.in]: _.map(myEvents, 'id') }
        }
      });

      modelIds = _.map(myEvents, 'id');
      let rates = [];
      if(modelIds.length > 0){
      rates = await context.app.service('rates').find(
        {
          query: {
            $sort: {id: 1},
            ratableId:{
              $in : modelIds
            }
          }
        }
      ).data;
      }


      let likesCount = 0;
      if (cUser) {
        likesCount = await likesModel.count({
          where: {
            likableId: user.id,
            userId: cUser.id
          }
        });
      }



      const services = await servicesModel.findAll({});
      const allQuestionsCount = await questionsModel.count({where:{
        status:1
        }});


      context.result.permissions = {
        allowSendingUrgentRequest:false,
        allowReserveTime: false,
        allowAskQuestion:true,
        allowAnswerQuestion:true,
      }


      context.result.services = services;
      context.result.allQuestionsCount = allQuestionsCount;

      context.result.isLiked = likesCount > 0 ? true : false;
      context.result.ratesCount = ratesCount;
      context.result.rates = rates;
      context.result.globalPrices = globalPrices[0];
      context.result.expertises = [];
      context.result.oldChat = undefined;
      context.result.onlineEvent = undefined;
      context.result.recievedEventRequests = [];
      context.result.records = [];
      context.result.routes = [];
      context.result.avatar = 'http://animoshaver.ir:5050/all-uploads/user.png';

      const allRoutes = await routesModel.findAll({
        where: {
          userTypeId:
          {
            [Op.lte]: user.userTypeId
          }
        }
      });

      if (!user.allowWork) {
        context.result.routes = _.filter(allRoutes, function (r) { return r.url === '/records' })
      } else {
        context.result.routes = allRoutes;
      }

      context.result.job = await expertisesModel.findOne({
        where: {
          id: user.jobId
        }
      });

      const recordTypes = await recordTypesModel.findAll({});
      const userFiles = await filesModel.findAll({
        where: {
          userId: user.id,
          status: true
        }
      });

      const avatar = _.find(userFiles, function (o) { return o.status && o.title === 'p'; });

      if (avatar) {
        context.result.avatar = "http://animoshaver.ir:5050/all-uploads/" + avatar.file;
      }

      const records = _.filter(userFiles, function (o) { return o.recordTypeId !== null && o.status; })


      recordTypes.forEach(rt => {
        let recordFile = _.find(userFiles, function (o) { return o.recordTypeId === rt.id; });
        context.result.records.push({
          title: rt.title,
          recordTypeId: rt.id,
          force: rt.force,
          approveDate: recordFile ? recordFile.approveDate : null,
          adminId: recordFile ? recordFile.adminId : null,
          recordFile: recordFile ? "http://animoshaver.ir:5050/all-uploads/" + recordFile.file : null
        })
      })


      const oldChats = (await context.app.service('events').find({
        query: {
          eventTypeId: { $in: [600, 700] },
          $or: [
            { userId: user.id },
            { reservedId: user.id }
          ]
        }
      })).data;

      if (oldChats.length > 0) {
        context.result.oldChat = oldChats[0];
        context.result.routes.shift({ id: 101, icon: 'forum', text: 'اتاق مشاوره', route: '/chatroom' })
      }


      if (user.userTypeId > 1) {

        context.result.expertises = (await context.app.service('expertiseUser').find({
          query: {
            userId: user.id
          }
        })).data;

        const onlineEvents = (await context.app.service('events').find({
          query: {
            eventTypeId: 10,
            userId: user.id
          }
        })).data;

        if (onlineEvents.length > 0) {
          context.result.onlineEvent = onlineEvents[0];
        }

        const recievedEventRequests = [];

        const recievedEventRequests1 = (await context.app.service('eventRequests').find({
          query: {
            $sort: { id: 1 },
            eventId: user.id,
            approveDate: null
          }
        })).data;

        recievedEventRequests1.forEach(event => {
          let idx = recievedEventRequests.findIndex(x => x.id === event.id);
          if (idx < 0) recievedEventRequests.push(event);
        });

        let expertiseIds = user.expertises.map(function (expertise) {
          return expertise.expertiseId
        });

        const recievedEventRequests2 = (await context.app.service('eventRequests').find({
          query: {
            expertiseId: {
              $in: expertiseIds
            },
            userId: {
              $ne: user.id
            },
            approveDate: null
          }
        })).data;

        recievedEventRequests2.forEach(event => {
          let idx = recievedEventRequests.findIndex(x => x.id === event.id);
          if (idx < 0) recievedEventRequests.push(event);
        });

        context.result.recievedEventRequests = recievedEventRequests;




      }
    }
  };
};
