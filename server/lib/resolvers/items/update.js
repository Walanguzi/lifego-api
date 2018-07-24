const {
  findOne,
  generateError,
  updateRecord,
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
  const existingItem = await findOne('items', {
    where: {
      name: body.name,
      bucketlistId: body.bucketlistId,
    },
  });
  if (existingItem) {
    return generateError({
      message: 'An item with that name exists',
      code: 409,
    });
  }
  const newItem = await updateRecord('items', {
    where: { id: body.id },
  }, body);

  return newItem;
};
