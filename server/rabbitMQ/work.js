/* eslint-disable no-console */
module.exports = ({ message, callback }) => {
  // TODO: Do something with message
  console.log('Message receiverd:', message);

  callback(true);
};
