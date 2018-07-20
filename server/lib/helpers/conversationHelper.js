const { getModel, findOne } = require('../utils');

const Message = getModel('messages');

const getAssociationOptions = () => ({
  include: [
    {
      model: Message,
      as: 'messages',
    },
  ],
  order: [
    [Message, 'id', 'ASC'],
  ],
});

const findConversation = async (id, context) => findOne('conversations', {
  where: {
    id,
    senderId: context.decoded.id,
  },
});

module.exports = {
  getAssociationOptions,
  findConversation,
};
