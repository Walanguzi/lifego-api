const useragent = require('express-useragent');
const socket = require('./socket');
const oauth = require('./oauth');
const rabbit = require('./rabbitMQ');
const logger = require('./logger');

module.exports = async ({ app, server }) => {
  socket({ app, server }); // setup socket.io
  app.use(useragent.express());

  oauth(app); // setup passport js

  logger(app); // setup logger

  await rabbit(app); // setup rabbitMQ
};
