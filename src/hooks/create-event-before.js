const moment = require('jalali-moment');
module.exports = function () {
  return async context => {
    const userId = context.data.userId;
    const start = context.data.start;
    const end = context.data.end;

if(end !== null){


    const eventQuery0 = {
      query: {
        $sort: {id: 1},
        userId: userId,
        start: moment(start),
        end: moment(end)
      }
    };

    const events0 = (await context.app.service('events').find(eventQuery0)).data;

    if (events0.length > 0) {
      throw new Error('امکان تعریف نوبت تکراری وجود ندارد');
    }

    const eventQuery1 = {
      query: {
        $sort: {id: 1},
        userId: userId,
        start: {
          $in: [
            moment(start).add(30, 'm').format('YYYY/MM/DD HH:mm:ss'),
            moment(start).add(60, 'm').format('YYYY/MM/DD HH:mm:ss'),
            moment(start).add(90, 'm').format('YYYY/MM/DD HH:mm:ss')
          ]
        }
      }
    };

    const events1 = (await context.app.service('events').find(eventQuery1)).data;

    if (events1.length === 3) {
      throw new Error('امکان تعریف بیش از سه نوبت وجود ندارد');
    }

    const eventQuery2 = {
      query: {
        $sort: {id: 1},
        userId: userId,
        start: {
          $in: [
            moment(start).subtract(60, 'm').format('YYYY/MM/DD HH:mm:ss'),
            moment(start).subtract(30, 'm').format('YYYY/MM/DD HH:mm:ss'),
            moment(start).add(30, 'm').format('YYYY/MM/DD HH:mm:ss'),
          ]
        }
      }
    };

    const events2 = (await context.app.service('events').find(eventQuery2)).data;

    if (events2.length === 3) {
      throw new Error('امکان تعریف بیش از سه نوبت وجود ندارد');
    }

    const eventQuery3 = {
      query: {
        $sort: {id: 1},
        userId: userId,
        start: {
          $in: [
            moment(start).subtract(90, 'm').format('YYYY/MM/DD HH:mm:ss'),
            moment(start).subtract(60, 'm').format('YYYY/MM/DD HH:mm:ss'),
            moment(start).subtract(30, 'm').format('YYYY/MM/DD HH:mm:ss'),
          ]
        }
      }
    };

    const events3 = (await context.app.service('events').find(eventQuery3)).data;

    if (events3.length === 3) {
      throw new Error('امکان تعریف بیش از سه نوبت وجود ندارد');
    }

    const eventQuery4 = {
      query: {
        $sort: {id: 1},
        userId: userId,
        start: {
          $in: [
            moment(start).subtract(30, 'm').format('YYYY/MM/DD HH:mm:ss'),
            moment(start).add(30, 'm').format('YYYY/MM/DD HH:mm:ss'),
            moment(start).subtract(60, 'm').format('YYYY/MM/DD HH:mm:ss'),
          ]
        }
      }
    };

    const events4 = (await context.app.service('events').find(eventQuery4)).data;

    if (events4.length === 3) {
      throw new Error('امکان تعریف بیش از سه نوبت وجود ندارد');
    }

    //const user = (await context.app.service('users').get(userId));
    //context.data.userFullName = user.fullName;
  }
  };
};
