/* eslint-disable no-console, no-constant-condition */
const closeOnError = require('./closeOnError');
const publish = require('./publish');

module.exports = async ({ amqpConn }) => {
  const offlinePubQueue = [];
  let publishChannel;

  const createChannel = new Promise((resolve) => {
    amqpConn.createConfirmChannel((err, channel) => {
      if (closeOnError({ amqpConn, error: err })) return;

      publishChannel = channel;

      publishChannel.on('error', (error) => {
        console.error('[AMQP] channel error', error.message);
      });

      publishChannel.on('close', () => {
        console.log('[AMQP] channel closed');
      });

      offlinePubQueue.forEach((message) => {
        publish({
          exchange: message[0],
          routingKey: message[1],
          content: message[2],
          publishChannel,
          offlinePubQueue,
        });
      });

      resolve({
        publishChannel,
        offlinePubQueue,
      });
    });
  });

  return createChannel;
};
