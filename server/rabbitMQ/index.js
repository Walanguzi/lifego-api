/* eslint-disable no-console */
const amqp = require('amqplib/callback_api');
const startPublisher = require('./startPublisher');
const startWorker = require('./startWorker');

const whenConnected = ({ amqpConn, callback }) => {
  startPublisher({
    amqpConn,
    callback: (publishData) => {
      startWorker(amqpConn);
      callback(publishData);
    },
  });
};

module.exports = (callback) => {
  amqp.connect(`${process.env.CLOUDAMQP_URL}?heartbeat=60`, (err, amqpConn) => {
    if (err) {
      console.error('[AMQP]', err.message);
    }

    amqpConn.on('error', (error) => {
      if (error.message !== 'Connection closing') {
        console.error('[AMQP] conn error', error.message);
      }
    });

    console.log('[AMQP] connected');

    whenConnected({ amqpConn, callback });
  });
};
