const {
  createRecord,
  generateError,
  findById,
} = require('../../utils');
const { createLikeNotification } = require('../../helpers/notificationHelper');

module.exports = async (root, body, context) => {
  const bucketlist = await findById('bucketlists', body.bucketlistId);

  if (!bucketlist) {
    return generateError({
      message: 'Bucketlist not found',
      code: 404,
    });
  }

  const [like] = await createRecord('likes', {
    where: {
      likerId: '',
    },
  }, {
    ...body,
    likerId: context.decoded.id,
  });

  await createLikeNotification(context, like);

  context.socket.emit('likes', {
    type: 'like',
    like,
  });

  return like;
};
