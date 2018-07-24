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

  context.socket.emit('bucketlists', {
    type: 'delete',
    bucketlist: {
      id,
      userId: context.decoded.id,
    },
  });

  return {
    message: 'success',
  };
};
