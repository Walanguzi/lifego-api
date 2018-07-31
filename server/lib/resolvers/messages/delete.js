const {
  generateError,
  deleteRecord,
} = require('../../utils');
const { findMessage } = require('../../helpers/messageHelper');
const { findConversation } = require('../../helpers/conversationHelper');

module.exports = async (root, body, context) => {
  const conversation = await findConversation(body.conversationId, context);

  if (!conversation) {
    return generateError({
      message: 'Conversation not found',
      code: 404,
    });
  }

  const message = await findMessage(body);

  if (!message) {
    return generateError({
      message: 'Message not found',
      code: 404,
    });
  }

  await deleteRecord('messages', body.id);

  context.socket.emit('messages', {
    type: 'delete',
    message: {
      id: body.id,
    },
  });

  return {
    message: 'success',
  };
};
