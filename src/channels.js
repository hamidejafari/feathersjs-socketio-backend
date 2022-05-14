module.exports = function (app) {
  if (typeof app.channel !== 'function') {
    return;
  }

  // Join a channel given a user and connection
  const joinChannels = async (user, connection) => {
    app.channel('anonymous').leave(connection);
    app.channel('authenticated').join(connection);


    if (user.userTypeId === 2 || user.userTypeId === 3) {
      //console.log('joined : ', user.id, ' to moshavers');
      app.channel('moshavers').join(connection);
    }

    //if (user.online === 0) {
    let moshaversEventsQuery = {
      query: {
        $sort: { id: -1 },
        $or: {
          userId: user.id,
          reservedId: user.id
        },
        eventTypeId: 600
      }
    };
    const moshaversEvents = (await app
      .service('events')
      .find(moshaversEventsQuery)).data;

    if (moshaversEvents.length > 0) {
      //console.log('joined : ', user.id, ' to ', moshaversEvents[0].id);
      app.channel(`rooms/${moshaversEvents[0].id}`).join(connection)
    }
  };

  const leaveChannels = user => {
    if (user) {
      app
        .channel(app.channels)
        .leave(connection => connection.user && connection.user.id === user.id);
      //console.log('user id leaved : ', user.id, ' channels : ', app.channels);
    }
  };

  const updateChannels = user => {

    if (user) {
      // Find all connections for this user
      const { connections } = app
        .channel(app.channels)
        .filter(connection => connection.user && connection.user.id === user.id);

      //console.log('user id channel updated : ', user.id);
      // Leave all channels
      leaveChannels(user);

      // Re-join all channels with the updated user information
      connections.forEach(connection => joinChannels(user, connection));
    }
  };

  app.on('connection', connection => {
    app.channel('anonymous').join(connection);
  });

  app.on('login', (authResult, { connection }) => {
    if (connection) {
      const user = connection.user;
      joinChannels(connection.user, connection);
    }
  });

  app.service('users').on('patched', updateChannels);

  app.service('messages').publish((data, context) => {
    //console.log(1);
    return app.channel(`rooms/${data.eventId}`);
  });

  app.publish((data, hook) => {
    // eslint-disable-line no-unused-vars
    // Publish all service events to all authenticated users
    //console.log(2,data);
    return app.channel('authenticated');
  });
};
