const {
  findOne,
  updateRecord,
  generateError,
} = require('../../utils');
const { findBucketlist } = require('../../helpers/bucketlistHelper');

module.exports = async (root, body, context) => {
  const bucketlist = await findBucketlist(body.id, context);
  if (!bucketlist) {
    return generateError({
      message: 'Bucketlist not found',
      code: 404,
    });
  }

  const existingBucketlist = await findOne('bucketlists', {
    where: {
      name: body.name,
      userId: context.decoded.id,
    },
  });

  if (existingBucketlist) {
    return generateError({
      message: 'A bucketlist with that name exists',
      code: 409,
    });
  }

  const newBucketlist = await updateRecord('bucketlists', {
    where: { id: body.id },
  }, body);

  context.socket.emit('bucketlists', {
    type: 'update',
    bucketlist: newBucketlist,
  });

  return newBucketlist;
};
