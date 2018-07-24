const {
  updateRecord,
  findById,
  generateError,
} = require('../../utils');

module.exports = async (root, { id }, context) => {
  const existingNotification = await findById('userNotifications', id);

  if (existingNotification) {
    if (existingNotification.read === true) {
      return existingNotification;
    }

    const userNotification = await updateRecord('userNotifications', {
      where: { id },
    }, { read: true });

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
