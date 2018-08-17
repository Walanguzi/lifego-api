const {
  updateRecord,
  findById,
  generateError,
} = require('../../utils');

module.exports = async (root, { id }, context) => {
  const existingNotification = await findById('notifications', id);

  if (existingNotification) {
    if (existingNotification.read === true) {
      return existingNotification;
    }

    let { dataValues: notification } = await updateRecord('notifications', {
      where: { id },
    }, { read: true });

    const { dataValues: notificationUser } = await findById('users', notification.sourceUserId);

    notification = {
      ...notification,
      user: notificationUser.displayName,
      userPictureUrl: notificationUser.pictureUrl,
    };

    context.socket.emit('notifications', {
      type: 'markAsRead',
      notification,
    });

    return notification;
  }

  return generateError({
    message: 'Notification not found',
    code: 404,
  });
};
