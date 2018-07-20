const {
  createRecord,
  generateError,
  findById,
} = require('../../utils');

module.exports = async (root, body, context) => {
  const receiver = await findById('users', body.receiverId);
  if (receiver) {
    const [conversation, created] = await createRecord('conversations', {
      where: {
        senderId: context.decoded.id,
        receiverId: body.receiverId,
      },
    }, body);
    if (created) {
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
