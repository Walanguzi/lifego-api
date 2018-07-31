const {
  GraphQLNonNull,
  GraphQLString,
} = require('graphql');

const {
  startConversationArgs,
  deleteConversationArgs,
} = require('../arguments');

describe('Conversation arguments tests', () => {
  test('startConversationArgs types', () => {
    expect(startConversationArgs).toHaveProperty('receiverId');
    expect(startConversationArgs.receiverId.type).toEqual(new GraphQLNonNull(GraphQLString));
  });

  test('deleteConversationArgs types', () => {
    expect(deleteConversationArgs).toHaveProperty('id');
    expect(deleteConversationArgs.id.type).toEqual(new GraphQLNonNull(GraphQLString));
  });
});
