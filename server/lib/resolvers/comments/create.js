const {
  createRecord,
  generateError,
} = require('../../utils');
const {
  findBucketlist,
  addCommentUserDetails,
} = require('../../helpers/bucketlistHelper');
const { createCommentNotification } = require('../../helpers/notificationHelper');

module.exports = async (root, body, context) => {
  const bucketlist = await findBucketlist(body.bucketlistId, context);
  if (!bucketlist) {
    return generateError({
      message: 'Bucketlist not found',
      code: 404,
    });
  }

  if (body.content) {
    let [comment] = await createRecord('comments', {
      where: {
        content: '',
      },
    }, {
      ...body,
      senderId: context.decoded.id,
    });

    comment = await addCommentUserDetails(comment);

    await createCommentNotification(context, comment);

    context.socket.emit('comments', {
      type: 'new',
      sourceUserId: context.decoded.id,
      comment,
    });

    return comment;
  }

  return generateError({
    message: 'Missing content',
    code: 400,
  });
};
