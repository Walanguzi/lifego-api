const { findAll } = require('../../utils');
const { getAssociationOptions } = require('../../helpers/conversationHelper');

const associationOptions = getAssociationOptions();

module.exports = async (root, body, context) => {
  const conversations = await findAll('conversations', {
    where: {
      $or: {
        senderId: context.decoded.id,
        receiverId: context.decoded.id,
      },
    },
    ...associationOptions,
  });
  return conversations;
};
