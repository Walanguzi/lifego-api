const {
  conversation,
  conversations,
} = require('./types');
const {
  startConversationArgs,
  deleteConversationArgs,
} = require('./arguments');
const {
  deleteConversation,
  getConversations,
  startConversation,
} = require('../../lib/resolvers/conversations');
const { successMessage } = require('../Common/types');

module.exports = {
  startConversation: {
    type: conversation,
    args: startConversationArgs,
    resolve: startConversation,
  },
  getConversations: {
    type: conversations,
    resolve: getConversations,
  },
  deleteConversation: {
    type: successMessage,
    args: deleteConversationArgs,
    resolve: deleteConversation,
  },
};
