const {
  findOne,
  updateRecord,
  generateError,
} = require('../../utils');
const {
  findBucketlist,
  addUserProperties,
} = require('../../helpers/bucketlistHelper');

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

  if (existingBucketlist && existingBucketlist.id !== bucketlist.id) {
    return generateError({
      message: 'A bucketlist with that name exists',
      code: 409,
    });
  }

  const newBucketlist = await updateRecord('bucketlists', {
    where: { id: body.id },
  }, body);

  let returnedBucketlist = await addUserProperties({
    ...newBucketlist,
    comments: bucketlist.comments,
  });

  returnedBucketlist = {
    ...returnedBucketlist,
    likes: bucketlist.likes,
    items: bucketlist.items,
  };

  context.socket.emit('bucketlists', {
    type: 'update',
    bucketlist: returnedBucketlist,
  });

  return returnedBucketlist;
};
