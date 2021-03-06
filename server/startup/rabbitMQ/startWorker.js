/* eslint-disable no-console */
const processMessage = require('./processMessage');
const closeOnError = require('./closeOnError');

module.exports = (amqpConn) => {
  amqpConn.createChannel((err, channel) => {
    if (closeOnError({ amqpConn, error: err })) return;

    channel.on('error', (error) => {
      console.error('[AMQP] channel error', error.message);
    });

    channel.on('close', () => {
      console.log('[AMQP] channel closed');
    });

    channel.prefetch(10);

    channel.assertQueue('email_sender', { durable: true }, (error) => {
      if (closeOnError({ amqpConn, error })) return;

      channel.consume('email_sender', message => processMessage({ message, channel, amqpConn }), { noAck: false });

      console.log('Worker is started');
    });
  });
};
