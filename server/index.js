require('express-async-errors');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const cors = require('cors');

const routes = require('./routes');
const oauth = require('./oauth');
const rabbit = require('./rabbitMQ');
const logger = require('./logger');

module.exports = async (app, server) => {
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  const socket = socketio(server, { pingTimeout: 30000 });
  app.set('socket', socket); // setup socket.io

  oauth(app); // setup passport js

  logger(app); // setup logger

  await rabbit(app); // setup rabbitMQ

  routes(app); // setup routes

  return app;
};
