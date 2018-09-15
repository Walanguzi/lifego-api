/* eslint-disable no-console */
const { updateJobId } = require('../lib/helpers/bucketlistHelper');

module.exports = async ({ message, callback }) => {
  await updateJobId(JSON.parse(message.content));

  callback(true);
};
