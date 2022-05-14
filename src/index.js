/* eslint-disable no-console,linebreak-style */
const logger = require('winston');
const app = require('./app');
const port = app.get('port');
const server = app.listen(port,'0.0.0.0');

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
);
