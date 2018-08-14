const {
  createRecord,
  findById,
} = require('../../utils');

module.exports = async (data, context) => {
  const [{ dataValues: userNotification }, created] = await createRecord('userNotifications', {
    where: {
      type: data.type,
      userId: data.userId,
      friendId: data.friendId,
      text: data.text,
    },
  }, data);

  const userNotificationUser = await findById('users', data.userId);

  const newNotification = {
    ...userNotification,
    user: userNotificationUser.displayName,
    userPictureUrl: userNotificationUser.pictureUrl,
  };

  if (created) {
    context.socket.emit('user_notifications', {
      type: 'new',
      alert: newNotification,
    });
  }

  return newNotification;
};
