const {
  deleteRecord,
  generateError,
} = require('../../utils');
const { findConversation } = require('../../helpers/conversationHelper');

module.exports = async (root, { id }, context) => {
  const conversation = await findConversation(id, context);
  if (conversation) {
    await deleteRecord('conversations', id);

    context.socket.emit('conversations', {
      type: 'delete',
      conversation: {
        id,
      },
    });

    return {
      message: 'Success',
    };
  }
  return generateError({
    message: 'Conversation does not exist',
    code: 404,
  });
};
