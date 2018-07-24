const { findOne } = require('../utils');

const findMessage = body => findOne('messages', {
  where: {
    id: body.id,
    conversationId: body.conversationId,
  },
});

module.exports = {
  findMessage,
};
