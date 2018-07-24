const {
  createRecord,
  findById,
} = require('../../utils');

module.exports = async (data, context) => {
  const [{ dataValues: notification }] = await createRecord('notifications', {
    where: {
      type: data.type,
      bucketlistId: data.bucketlistId,
      text: data.text,
      createdAt: Date.now(),
    },
  }, data);

  const notificationUser = await findById('users', data.sourceUserId);

  const newNotification = {
    ...notification,
    user: notificationUser.displayName,
    userPictureUrl: notificationUser.pictureUrl,
    sourceUserId: context.decoded.id,
  };

  context.socket.emit('notifications', {
    type: 'new',
    notification: newNotification,
  });

  return newNotification;
};
