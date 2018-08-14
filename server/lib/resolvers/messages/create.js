const {
  createRecord,
  generateError,
} = require('../../utils');
const {
  findConversation,
  addMessageUserDetails,
} = require('../../helpers/conversationHelper');

module.exports = async (root, body, context) => {
  const conversation = await findConversation(body.conversationId, context);

  if (!conversation) {
    return generateError({
      message: 'Conversation not found',
      code: 404,
    });
  }

  if (body.content) {
    let [message] = await createRecord('messages', {
      where: {
        content: '',
      },
    }, {
      ...body,
      read: false,
      senderId: context.decoded.id,
    });

    message = await addMessageUserDetails({ message, conversation });

    context.socket.emit('messages', {
      type: 'new',
      message,
    });

    return message;
  }

  return generateError({
    message: 'Missing content',
    code: 400,
  });
};
