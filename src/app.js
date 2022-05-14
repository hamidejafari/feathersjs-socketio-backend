/* eslint-disable no-unused-vars */
const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const winston = require('winston');
var logger = require('feathers-logger');
//const sync = require('feathers-sync');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const firebaseAdmin = require('./firebase-admin');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

const fs = require('fs');
const https = require('https');

const middleware = require('./middleware');
const schedules = require('./schedules');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const sequelize = require('./sequelize');

const authentication = require('./authentication');

const bodyParser = require('body-parser');

const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(express.json());
// Parse HTTP JSON bodies
app.use(bodyParser.json({limit: '20mb'}));
// Parse URL-encoded params
app.use(bodyParser.urlencoded({limit: '20mb', extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));

// Set up Plugins and providers
/*
app.configure(sync({
  uri: 'redis://:RBOJ9cCNoGCKhlEBwQLHri1g+atWgn4Xn4HwNUbtzoVxAYxkiYBi7aufl4MILv1nxBqR4L6NNzI0X6cE@localhost:6379'
}));
*/
app.configure(express.rest());
app.configure(logger(winston));
app.configure(socketio({
  pingInterval: 10000,
  timeout: 30000,
  pingTimeout: 50000
}));

/*
const opts = {
  key: fs.readFileSync('privkey.pem'),
  cert: fs.readFileSync('cert.pem')
};
const server = https.createServer(opts, app).listen(5050);
app.setup(server);
*/
app.configure(sequelize);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);
app.configure(() =>{
  //app.set('firebaseAdmin',firebaseAdmin);
});

app.configure(schedules);
module.exports = app;
