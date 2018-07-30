const {
  generateError,
  deleteRecord,
} = require('../../utils');
const { findItem } = require('../../helpers/itemHelper');
const { findBucketlist } = require('../../helpers/bucketlistHelper');

module.exports = async (root, body, context) => {
  const bucketlist = await findBucketlist(body.bucketlistId, context);

  if (!bucketlist) {
    return generateError({
      message: 'Bucketlist not found',
      code: 404,
    });
  }

  const item = await findItem(body);

  if (!item) {
    return generateError({
      message: 'Item not found',
      code: 404,
    });
  }

  await deleteRecord('items', body.id);

  return {
    message: 'success',
  };
};
