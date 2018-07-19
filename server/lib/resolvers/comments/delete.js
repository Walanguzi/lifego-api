const {
  generateError,
  deleteRecord,
} = require('../../utils');
const { findComment } = require('../../helpers/commentHelper');
const { findBucketlist } = require('../../helpers/bucketlistHelper');

module.exports = async (root, body, context) => {
  const bucketlist = await findBucketlist(body.bucketlistId, context);
  if (!bucketlist) {
    return generateError({
      message: 'Bucketlist not found',
      code: 404,
    });
  }
  const comment = await findComment(body);
  if (!comment) {
    return generateError({
      message: 'Comment not found',
      code: 404,
    });
  }
  await deleteRecord('comments', body.id);
  return {
    message: 'success',
  };
};
