const {
  deleteRecord,
  generateError,
} = require('../../utils');

const { findBucketlist } = require('../../helpers/bucketlistHelper');

module.exports = async (root, { id }, context) => {
  const bucketlist = await findBucketlist(id, context);
  if (!bucketlist) {
    return generateError({
      message: 'Bucketlist not found',
      code: 404,
    });
  }
  await deleteRecord('bucketlists', id);

  return {
    message: 'success',
  };
};
