const {
  createRecord,
  generateError,
} = require('../../utils');
const { findConversation } = require('../../helpers/conversationHelper');

module.exports = async (root, body, context) => {
  const conversation = await findConversation(body.conversationId, context);
  if (!conversation) {
    return generateError({
      message: 'Conversation not found',
      code: 404,
    });
  }
  if (body.content) {
    const [message] = await createRecord('messages', {
      where: {
        content: '',
      },
    }, body);
    return message;
  }
  return generateError({
    message: 'Missing content',
    code: 400,
  });
};
