const {
  generateError,
  updateRecord,
} = require('../../utils');
const { findMessage } = require('../../helpers/messageHelper');
const { findConversation, addMessageUserDetails } = require('../../helpers/conversationHelper');

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
  const newMessage = await updateRecord('messages', {
    where: { id: body.id },
  }, body);

  return addMessageUserDetails(newMessage);
};
