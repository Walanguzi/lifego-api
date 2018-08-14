const {
  generateError,
  deleteRecord,
  findById,
} = require('../../utils');
const { findComment } = require('../../helpers/commentHelper');

module.exports = async (root, body, context) => {
  const bucketlist = await findById('bucketlists', body.bucketlistId);

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

  context.socket.emit('comments', {
    type: 'delete',
    comment: {
      id: body.id,
    },
  });

  return {
    message: 'success',
  };
};
