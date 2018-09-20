const winston = require('winston');
require('winston-mongodb');
const logResponse = require('../lib/middleware/logResponse');
const graphQLLogger = require('../lib/middleware/graphQLLogger');

const db = {
  production: process.env.MONGODB_URI,
  development: 'mongodb://127.0.0.1:27017/lifego_logs',
  test: 'mongodb://127.0.0.1:27017/lifego_logs_test',
};

module.exports = (app) => {
  const logger = winston.createLogger({
    transports: [
      new winston.transports.File({
        filename: 'logs.log',
        level: 'info',
        handleExceptions: true,
        json: true,
      }),
      new winston.transports.MongoDB({
        db: db[process.env.NODE_ENV],
        level: 'info',
        collection: 'logs',
        options: {
          autoReconnect: true,
          useNewUrlParser: true,
        },
      }),
    ],
  });

  app.use(logResponse);

  app.use(graphQLLogger);


  app.set('logger', logger);
};
