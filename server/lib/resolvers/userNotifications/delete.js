const {
  findById,
  deleteRecord,
  generateError,
} = require('../../utils');

module.exports = async (root, { id }, context) => {
  const userNotification = await findById('userNotifications', id);

  if (userNotification) {
    await deleteRecord('userNotifications', id);

    context.socket.emit('user_notifications', {
      type: 'delete',
      alert: { id },
    });

    return {
      message: 'Success',
    };
  }

  return generateError({
    message: 'Notification not found',
    code: 404,
  });
};
