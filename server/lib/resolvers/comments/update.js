const {
  generateError,
  updateRecord,
  findById,
} = require('../../utils');
const { findComment } = require('../../helpers/commentHelper');
const { addCommentUserDetails } = require('../../helpers/bucketlistHelper');

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

  const newComment = await updateRecord('comments', {
    where: { id: body.id },
  }, body);

  context.socket.emit('comments', {
    type: 'update',
    comment: newComment,
  });

  return addCommentUserDetails(newComment);
};
