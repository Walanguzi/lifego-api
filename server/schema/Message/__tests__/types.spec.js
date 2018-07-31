const {
  GraphQLNonNull,
  GraphQLString,
} = require('graphql');
const { message } = require('../types');

describe('Message type tests', () => {
  test('Should have all model fields', () => {
    expect(message.getFields()).toHaveProperty('id');
    expect(message.getFields().id.type).toEqual(new GraphQLNonNull(GraphQLString));

    expect(message.getFields()).toHaveProperty('content');
    expect(message.getFields().content.type).toEqual(new GraphQLNonNull(GraphQLString));

    expect(message.getFields()).toHaveProperty('conversationId');
    expect(message.getFields().conversationId.type).toEqual(new GraphQLNonNull(GraphQLString));

    expect(message.getFields()).toHaveProperty('senderId');
    expect(message.getFields().senderId.type).toEqual(new GraphQLNonNull(GraphQLString));

    expect(message.getFields()).toHaveProperty('user');
    expect(message.getFields().user.type).toEqual(GraphQLString);

    expect(message.getFields()).toHaveProperty('userPictureUrl');
    expect(message.getFields().userPictureUrl.type).toEqual(GraphQLString);
  });
});
