const {
  createRecord,
  generateError,
} = require('../../utils');
const { findBucketlist } = require('../../helpers/bucketlistHelper');

module.exports = async (root, body, context) => {
  const bucketlist = await findBucketlist(body.bucketlistId, context);

  if (!bucketlist) {
    return generateError({
      message: 'Bucketlist not found',
      code: 404,
    });
  }

  if (body.name) {
    const [item, created] = await createRecord('items', {
      where: {
        name: body.name,
        bucketlistId: body.bucketlistId,
      },
    }, body);

    if (created) {
      return item;
    }

    return generateError({
      message: 'Name already in use',
      code: 409,
    });
  }

  return generateError({
    message: 'Missing name',
    code: 400,
  });
};
