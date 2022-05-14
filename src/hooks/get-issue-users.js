/* eslint-disable linebreak-style,indent */
const _ = require('lodash');
const Sequelize = require('sequelize');
const { Op } = Sequelize;
module.exports = function() {
    return async context => {
      // const sequelize = context.app.get('sequelizeClient');
      const user = context.params.user;
      let query = context.params.query;
      const userTypeModel = context.app.services.userTypes.Model;
      const expertiseUserModel = context.app.services.expertises.Model;
      const issueModel = context.app.services.issues.Model;
      const filesModel = context.app.services.files.Model
      if (query.$issue) {
        delete context.params.query.issue;

        const myReceivedIssues = await issueModel.findAll({
          attributes: ['senderId'],
          where:{
            receiverId: user.id,
            deletedAt: null
        }});

        const senderUsers = {
          include: [
            {
              model: filesModel
            }
          ],
          where: {
            id:   { [Op.in]: _.map(myReceivedIssues, 'senderId') },
            deletedAt: null
          },
          raw: false
        }

        const issueUsers = {
          include: [
            {
              model: userTypeModel,
              attributes: ["title"],
              where: {
                id: {
                  $in: [2, 3]
                }
              }
            },
            {
              model: expertiseUserModel,
              attributes: ["title"]
            },
            {
              model: filesModel
            }
          ],
          where: {
            allowIssue: 1,
            status:1,
            allowWork:1,
            deletedAt: null
          },
          raw: false
        }
        context.params.sequelize =  user.userTypeId === 1 ? issueUsers : senderUsers;
      }
       
    }
  }
  