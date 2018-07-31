const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
} = require('graphql');
const {
  conversation,
  conversations,
} = require('../types');
const { message } = require('../../Message/types');

describe('Conversation type tests', () => {
  test('Should have all model fields', () => {
    expect(conversation.getFields()).toHaveProperty('id');
    expect(conversation.getFields().id.type).toEqual(new GraphQLNonNull(GraphQLString));

    expect(conversation.getFields()).toHaveProperty('receiverId');
    expect(conversation.getFields().receiverId.type).toEqual(new GraphQLNonNull(GraphQLString));

    expect(conversation.getFields()).toHaveProperty('senderId');
    expect(conversation.getFields().senderId.type).toEqual(new GraphQLNonNull(GraphQLString));

    expect(conversation.getFields()).toHaveProperty('messages');
    expect(conversation.getFields().messages.type).toEqual(new GraphQLList(message));
  });
});

describe('Conversations type tests', () => {
  test('Should have all model fields', () => {
    expect(conversations).toEqual(new GraphQLList(conversation));
  });
});
