module.exports = function sendPushForUpcomingChatEvents(events, firebaseAdmin) {
    events.forEach(event => {
        const moshaver = event.EventUser;
        const user = event.ReservedUser;
        const expertise = event.Expertise;

        let type = '';
        if (event.isChat) {
            type = 'نوشتاری';
        } else if (type.isPhone) {
            type = 'تلفنی';
        } else if (type.isFace) {
            type = 'حضوری';
        }

        if (moshaver.firebase_token && moshaver.firebase_token !== null) {

            firebaseAdmin.messaging().send({
                /*
                data: {
                    type: 'event',
                    event: event
                },
                notification: {
                    title: 'آنی مشاور',
                    body: 'مشاوره : ' + user.name + ' ' + user.family + ' - ' + expertise.title,
                },
                */
                android: {
                    collapseKey: event.id.toString(),
                    data: {
                        type: 'event',
                        eventId: event.id.toString()
                    },
                    notification: {
                        sound: 'moshaver',
                        tag: 'msg',
                        title: 'آنی مشاور',
                        body: 'مشاوره : ' + user.name + ' ' + user.family + ' - ' + expertise.title + ' : ' + type
                    }
                },
                token: moshaver.firebase_token
            })
                .then((response) => {
                    console.log('Successfully sent message:', response);
                })
                .catch((error) => {
                    console.log('Error sending message:', error);
                });
        }

        if (user.firebase_token && user.firebase_token !== null) {

            firebaseAdmin.messaging().send({
                /*
                data: {
                    type: 'event',
                    event: event
                },
                notification: {
                    title: 'آنی مشاور',
                    body: 'مشاوره : ' + user.name + ' ' + user.family + ' - ' + expertise.title,
                },
                */
                android: {
                    collapseKey: event.id.toString(),
                    data: {
                        type: 'event',
                        eventId: event.id.toString()
                    },
                    notification: {
                        sound: 'notification',
                        tag: 'msg',
                        title: 'آنی مشاور',
                        body: 'مشاوره : ' + moshaver.name + ' ' + moshaver.family + ' - ' + expertise.title + ' : ' + type
                    }
                },
                token: user.firebase_token
            })
                .then((response) => {
                    console.log('Successfully sent message:', response);
                })
                .catch((error) => {
                    console.log('Error sending message:', error);
                });
        }


    });
}
