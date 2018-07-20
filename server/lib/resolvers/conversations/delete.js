const {
  deleteRecord,
  generateError,
} = require('../../utils');
const { findConversation } = require('../../helpers/conversationHelper');

module.exports = async (root, body, context) => {
  const conversation = await findConversation(body.id, context);
  if (conversation) {
    await deleteRecord('conversations', body.id);
    return {
      message: 'Success',
    };
  }
  return generateError({
    message: 'Conversation does not exist',
    code: 404,
  });
};
