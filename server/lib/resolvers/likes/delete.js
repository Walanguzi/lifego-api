const {
  generateError,
  deleteRecord,
  findById,
} = require('../../utils');
const { findLike } = require('../../helpers/likeHelper');

module.exports = async (root, body, context) => {
  const bucketlist = await findById('bucketlists', body.bucketlistId);

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

  context.socket.emit('likes', {
    type: 'unlike',
    like: {
      id: body.id,
    },
  });

  return {
    message: 'success',
  };
};
