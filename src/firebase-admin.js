const admin = require('firebase-admin');

const serviceAccount = require('./wemoshaver-9eada-firebase-adminsdk-izrbo-2bc3a8605e.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://wemoshaver-9eada.firebaseio.com'
});

//console.log('Firebase Admin Initialized');


module.exports = admin;
