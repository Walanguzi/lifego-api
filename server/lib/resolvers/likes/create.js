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
  if (body.likerId) {
    const [like] = await createRecord('likes', {
      where: {
        likerId: '',
      },
    }, body);
    return like;
  }
  return generateError({
    message: 'Missing liker id',
    code: 400,
  });
};
