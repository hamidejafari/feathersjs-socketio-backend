const schedule = require("node-schedule");
const moment = require("jalali-moment");
//const sendPushForUpcomingChatEvents = require("../functions/sendPushForUpcomingEvents");

module.exports = function (app) {
  //const firebaseAdmin = app.get("firebaseAdmin");

  schedule.scheduleJob("0 0 0 * * *", async function () {
    app.set("active", false);

    await app.service("users").patch(
      null,
      {
        online: false
      },
      {
        query: {
          online: true
        }
      }
    );

    await app.service("events").patch(
      null,
      {
        eventTypeId: 500
      },
      {
        query: {
          $sort: { id: 1 },
          eventTypeId: 0,
          start: {
            $lt: moment()
          }
        }
      }
    );
  });

  schedule.scheduleJob("0 0 7 * * *", async function () {
    app.set("active", true);
  });

  schedule.scheduleJob("* * * * *", async function () {

    await app.service("users").patch(
      null,
      {
        walletChange: false
      },
      {
        query: {
          walletChange: true
        }
      }
    );

    let currentChatEventsQuery = {
      query: {
        $sort: { id: 1 },
        eventTypeId: 600,
        isChat: 1
      }
    };

    const currentChatEvents = (await app
      .service("events")
      .find(currentChatEventsQuery)).data;

    currentChatEvents.forEach(async event => {
      let date1 = moment();
      let date2 = moment(event.end);
      let differenceInSeconds = date2.diff(date1, "seconds");
      await app.service("events").patch(event.id, {
        remainingTime: differenceInSeconds,
        eventTypeId: differenceInSeconds <= 0 ? 120 : event.eventTypeId
      });
    });

    let currentPhoneEventsQuery = {
      query: {
        $sort: { id: 1 },
        eventTypeId: 700,
        isPhone: 1
      }
    };

    const currentPhoneEvents = (await app
      .service("events")
      .find(currentPhoneEventsQuery)).data;

    currentPhoneEvents.forEach(async event => {
      let date1 = moment();
      let date2 = moment(event.end);
      let differenceInSeconds = date2.diff(date1, "seconds");
      await app.service("events").patch(event.id, {
        remainingTime: differenceInSeconds,
        eventTypeId: differenceInSeconds <= 0 ? 120 : event.eventTypeId
      });
    });

    const upcomingChatEvents = (await app.service("events").find({
      query: {
        $sort: { id: 1 },
        isChat: 1,
        reservedId: {
          $ne: null
        },
        eventTypeId: 0,
        start: moment().add(2, "minutes")
      }
    })).data;

    const upcomingPhoneEvents = (await app.service("events").find({
      query: {
        $sort: { id: 1 },
        isPhone: 1,
        reservedId: {
          $ne: null
        },
        eventTypeId: 0,
        start: moment().add(2, "minutes")
      }
    })).data;

    await app.service("events").patch(
      null,
      {
        eventTypeId: 600
      },
      {
        query: {
          $sort: { id: 1 },
          isChat: 1,
          reservedId: {
            $ne: null
          },
          eventTypeId: 0,
          start: moment().add(2, "minutes")
        }
      }
    );

    await app.service("events").patch(
      null,
      {
        eventTypeId: 700
      },
      {
        query: {
          $sort: { id: 1 },
          isPhone: 1,
          reservedId: {
            $ne: null
          },
          eventTypeId: 0,
          start: moment().add(2, "minutes")
        }
      }
    );


    const expiredTime = moment().subtract(2, 'minutes').format();

    const expiredRequestsQuery = {
      query: {
        $sort: { id: 1 },
        approveDate: null,
        createdAt: {
          $lt: expiredTime
        }
      }
    }

    /*
    const expiredRequests = (await app
      .service("eventRequests")
      .find(expiredRequestsQuery)).data;

    console.log('expired requests : ',expiredRequests.length);
    */

    await app.service("eventRequests").remove(null ,expiredRequestsQuery);

    //console.log(app.channels);
    app.channels.forEach(channel => {
      let cName = channel;
      let users = [];
      app.channel(channel).connections.forEach(con => {
        if (con.user) {
          users.push(con.user.id);
        }
      });

      //console.log(cName, " : ", users);
    });

    await app.service("events").patch(
      null,
      {
        eventTypeId: 500
      },
      {
        query: {
          $sort: { id: 1 },
          eventTypeId: 0,
          start: {
            $lt: moment()
          }
        }
      }
    );

    //sendPushForUpcomingChatEvents(upcomingChatEvents, firebaseAdmin);
    // console.log("Upcoming Chat Events Count : ", upcomingChatEvents.length);
    //sendPushForUpcomingChatEvents(upcomingPhoneEvents, firebaseAdmin);
    // console.log("Upcoming Phone Events Count : ", upcomingPhoneEvents.length);
  });
};
