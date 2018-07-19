const {
  generateError,
  deleteRecord,
} = require('../../utils');
const { findLike } = require('../../helpers/likeHelper');
const { findBucketlist } = require('../../helpers/bucketlistHelper');

module.exports = async (root, body, context) => {
  const bucketlist = await findBucketlist(body.bucketlistId, context);
  if (!bucketlist) {
    return generateError({
      message: 'Bucketlist not found',
      code: 404,
    });
  }
  const like = await findLike(body.id, context);
  if (!like) {
    return generateError({
      message: 'Like not found',
      code: 404,
    });
  }
  await deleteRecord('likes', body.id);
  return {
    message: 'success',
  };
};
