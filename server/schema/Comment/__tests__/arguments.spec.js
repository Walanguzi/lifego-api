const {
  GraphQLNonNull,
  GraphQLString,
} = require('graphql');

const {
  createCommentArgs,
  updateCommentArgs,
  deleteCommentArgs,
} = require('../arguments');

describe('Comment arguments tests', () => {
  test('createCommentArgs types', () => {
    expect(createCommentArgs).toHaveProperty('content');
    expect(createCommentArgs.content.type).toEqual(new GraphQLNonNull(GraphQLString));

    expect(createCommentArgs).toHaveProperty('bucketlistId');
    expect(createCommentArgs.bucketlistId.type).toEqual(new GraphQLNonNull(GraphQLString));
  });

  test('updateCommentArgs types', () => {
    expect(updateCommentArgs).toHaveProperty('id');
    expect(updateCommentArgs.id.type).toEqual(new GraphQLNonNull(GraphQLString));

    expect(updateCommentArgs).toHaveProperty('content');
    expect(updateCommentArgs.content.type).toEqual(new GraphQLNonNull(GraphQLString));

    expect(updateCommentArgs).toHaveProperty('bucketlistId');
    expect(updateCommentArgs.bucketlistId.type).toEqual(new GraphQLNonNull(GraphQLString));
  });

  test('deleteCommentArgs types', () => {
    expect(deleteCommentArgs).toHaveProperty('id');
    expect(deleteCommentArgs.id.type).toEqual(new GraphQLNonNull(GraphQLString));

    expect(deleteCommentArgs).toHaveProperty('bucketlistId');
    expect(deleteCommentArgs.bucketlistId.type).toEqual(new GraphQLNonNull(GraphQLString));
  });
});
