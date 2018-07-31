const {
  findById,
  deleteRecord,
  generateError,
} = require('../../utils');

module.exports = async (root, { id }, context) => {
  const notification = await findById('notifications', id);

  if (notification) {
    await deleteRecord('notifications', id);

    context.socket.emit('notifications', {
      type: 'delete',
      notification: { id },
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
