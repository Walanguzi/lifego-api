const { message } = require('./types');
const {
  createMessageArgs,
  updateMessageArgs,
  deleteMessageArgs,
} = require('./arguments');
const {
  deleteMessage,
  updateMessage,
  createMessage,
} = require('../../lib/resolvers/messages');
const { successMessage } = require('../Common/types');

module.exports = {
  createMessage: {
    type: message,
    args: createMessageArgs,
    resolve: createMessage,
  },
  updateMessage: {
    type: message,
    args: updateMessageArgs,
    resolve: updateMessage,
  },
  deleteMessage: {
    type: successMessage,
    args: deleteMessageArgs,
    resolve: deleteMessage,
  },
};
