const winston = require('winston');
require('winston-mongodb');

const db = {
  production: process.env.MONGODB_URI,
  development: 'mongodb://127.0.0.1:27017/lifego_logs',
  test: 'mongodb://127.0.0.1:27017/lifego_logs_test',
};

module.exports = () => winston.createLogger({
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
