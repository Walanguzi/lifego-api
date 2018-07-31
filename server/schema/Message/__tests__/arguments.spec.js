const {
  GraphQLNonNull,
  GraphQLString,
} = require('graphql');

const {
  createMessageArgs,
  updateMessageArgs,
  deleteMessageArgs,
} = require('../arguments');

describe('Message arguments tests', () => {
  test('createMessageArgs types', () => {
    expect(createMessageArgs).toHaveProperty('content');
    expect(createMessageArgs.content.type).toEqual(new GraphQLNonNull(GraphQLString));

    expect(createMessageArgs).toHaveProperty('conversationId');
    expect(createMessageArgs.conversationId.type).toEqual(new GraphQLNonNull(GraphQLString));
  });

  test('updateMessageArgs types', () => {
    expect(updateMessageArgs).toHaveProperty('id');
    expect(updateMessageArgs.id.type).toEqual(new GraphQLNonNull(GraphQLString));

    expect(updateMessageArgs).toHaveProperty('content');
    expect(updateMessageArgs.content.type).toEqual(new GraphQLNonNull(GraphQLString));

    expect(updateMessageArgs).toHaveProperty('conversationId');
    expect(updateMessageArgs.conversationId.type).toEqual(new GraphQLNonNull(GraphQLString));
  });

  test('deleteMessageArgs types', () => {
    expect(deleteMessageArgs).toHaveProperty('id');
    expect(deleteMessageArgs.id.type).toEqual(new GraphQLNonNull(GraphQLString));

    expect(deleteMessageArgs).toHaveProperty('conversationId');
    expect(deleteMessageArgs.conversationId.type).toEqual(new GraphQLNonNull(GraphQLString));
  });
});
