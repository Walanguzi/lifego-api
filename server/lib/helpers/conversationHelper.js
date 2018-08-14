const {
  getModel, findOne, asyncForEach, findById,
} = require('../utils');

const Message = getModel('messages');

const getAssociationOptions = () => ({
  include: [
    {
      model: Message,
      as: 'messages',
    },
  ],
  order: [
    [Message, 'id', 'DESC'],
  ],
});

const findConversation = async (id, context) => findOne('conversations', {
  where: {
    id,
    $or: {
      senderId: context.decoded.id,
      receiverId: context.decoded.id,
    },
  },
});

const addMessageUserDetails = async ({ message, conversation }) => {
  const user = await findById('users', message.senderId);
  return ({
    ...message.dataValues,
    user: user.dataValues.displayName,
    userPictureUrl: user.dataValues.pictureUrl,
    receiverId: message.senderId === conversation.senderId
      ? conversation.receiverId
      : conversation.senderId,
  });
};

const addConversationUserDetails = async (conversation) => {
  const {
    dataValues: {
      displayName: senderDisplayName,
      pictureUrl: senderPictureUrl,
    },
  } = await findById('users', conversation.senderId);
  const {
    dataValues: {
      displayName: receiverDisplayName,
      pictureUrl: receiverPictureUrl,
    },
  } = await findById('users', conversation.receiverId);

  return ({
    ...conversation.dataValues,
    senderDisplayName,
    senderPictureUrl,
    receiverDisplayName,
    receiverPictureUrl,
  });
};

const addUserProperties = async (conversations) => {
  const returnCovnersations = [];
  const messages = [];
  await asyncForEach(conversations, async (conversation) => {
    await asyncForEach(conversation.messages, async (message) => {
      messages.push(await addMessageUserDetails({ message, conversation }));
    });
    const sender = await findById('users', conversation.senderId);
    const receiver = await findById('users', conversation.receiverId);
    returnCovnersations.push({
      ...conversation.dataValues,
      messages,
      senderPictureUrl: sender.dataValues.pictureUrl,
      senderDisplayName: sender.dataValues.displayName,
      receiverPictureUrl: receiver.dataValues.pictureUrl,
      receiverDisplayName: receiver.dataValues.displayName,
    });
  });
  return returnCovnersations;
};

module.exports = {
  getAssociationOptions,
  findConversation,
  addUserProperties,
  addMessageUserDetails,
  addConversationUserDetails,
};
