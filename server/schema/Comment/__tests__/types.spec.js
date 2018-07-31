const {
  GraphQLNonNull,
  GraphQLString,
} = require('graphql');
const { comment } = require('../types');

describe('Comment type tests', () => {
  test('Should have all model fields', () => {
    expect(comment.getFields()).toHaveProperty('id');
    expect(comment.getFields().id.type).toEqual(new GraphQLNonNull(GraphQLString));

    expect(comment.getFields()).toHaveProperty('content');
    expect(comment.getFields().content.type).toEqual(new GraphQLNonNull(GraphQLString));

    expect(comment.getFields()).toHaveProperty('bucketlistId');
    expect(comment.getFields().bucketlistId.type).toEqual(new GraphQLNonNull(GraphQLString));

    expect(comment.getFields()).toHaveProperty('senderId');
    expect(comment.getFields().senderId.type).toEqual(new GraphQLNonNull(GraphQLString));

    expect(comment.getFields()).toHaveProperty('user');
    expect(comment.getFields().user.type).toEqual(GraphQLString);

    expect(comment.getFields()).toHaveProperty('userPictureUrl');
    expect(comment.getFields().userPictureUrl.type).toEqual(GraphQLString);
  });
});
