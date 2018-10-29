const {
  updateRecord,
  findById,
  generateError,
} = require('../../utils');

module.exports = async (root, { id }, context) => {
  const existingNotification = await findById('userNotifications', id);

  if (existingNotification) {
    if (existingNotification.read === true) return existingNotification;

    let { dataValues: userNotification } = await updateRecord('userNotifications', {
      where: { id },
    }, { read: true });

    const notificationUser = await findById('users', userNotification.userId);

    userNotification = {
      ...userNotification,
      user: notificationUser.displayName,
      userPictureUrl: notificationUser.pictureUrl,
    };

    context.socket.emit('user_notifications', {
      type: 'markAsRead',
      alert: userNotification,
    });

    return userNotification;
  }

  return generateError({
    message: 'Notification not found',
    code: 404,
  });
};
