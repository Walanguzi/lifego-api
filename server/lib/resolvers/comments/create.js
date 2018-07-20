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
  if (body.content) {
    const [comment] = await createRecord('comments', {
      where: {
        content: '',
      },
    }, body);
    return comment;
  }
  return generateError({
    message: 'Missing content',
    code: 400,
  });
};
