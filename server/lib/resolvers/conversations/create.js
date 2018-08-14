const { addConversationUserDetails } = require('../../helpers/conversationHelper');

const {
  createRecord,
  generateError,
  findById,
} = require('../../utils');

module.exports = async (root, body, context) => {
  const receiver = await findById('users', body.receiverId);

  if (receiver) {
    const [newConversation, created] = await createRecord('conversations', {
      where: {
        senderId: context.decoded.id,
        receiverId: body.receiverId,
      },
    }, body);

    if (created) {
      let conversation = await addConversationUserDetails(newConversation);

      conversation = {
        ...conversation,
        messages: conversation.messages || [],
      };

      context.socket.emit('conversations', {
        type: 'new',
        conversation,
      });

      return conversation;
    }

    return generateError({
      message: 'Conversation already exists',
      code: 409,
    });
  }

  return generateError({
    message: 'Receiver does not exist',
    code: 404,
  });
};
