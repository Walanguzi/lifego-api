const { conversation } = require('../types');
const {
  startConversationArgs,
  deleteConversationArgs,
} = require('../arguments');
const conversationResolvers = require('../../../lib/resolvers/conversations');
const { successMessage } = require('../../Common/types');

const {
  startConversation,
  deleteConversation,
} = require('../mutations');

describe('Conversation mutation tests', () => {
  test('startConversation mutation', () => {
    expect(startConversation).toHaveProperty('type');
    expect(startConversation.type).toEqual(conversation);

    expect(startConversation).toHaveProperty('args');
    expect(startConversation.args).toEqual(startConversationArgs);

    expect(startConversation).toHaveProperty('resolve');
    expect(startConversation.resolve).toEqual(conversationResolvers.startConversation);
  });

  test('deleteConversation mutation', () => {
    expect(deleteConversation).toHaveProperty('type');
    expect(deleteConversation.type).toEqual(successMessage);

    expect(deleteConversation).toHaveProperty('args');
    expect(deleteConversation.args).toEqual(deleteConversationArgs);

    expect(deleteConversation).toHaveProperty('resolve');
    expect(deleteConversation.resolve).toEqual(conversationResolvers.deleteConversation);
  });
});
