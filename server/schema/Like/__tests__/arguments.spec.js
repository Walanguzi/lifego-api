const {
  GraphQLNonNull,
  GraphQLString,
} = require('graphql');

const {
  likeArgs,
  unlikeArgs,
} = require('../arguments');

describe('Like arguments tests', () => {
  test('likeArgs types', () => {
    expect(likeArgs).toHaveProperty('likerId');
    expect(likeArgs.likerId.type).toEqual(new GraphQLNonNull(GraphQLString));

    expect(likeArgs).toHaveProperty('bucketlistId');
    expect(likeArgs.bucketlistId.type).toEqual(new GraphQLNonNull(GraphQLString));
  });

  test('unlikeArgs types', () => {
    expect(unlikeArgs).toHaveProperty('id');
    expect(unlikeArgs.id.type).toEqual(new GraphQLNonNull(GraphQLString));

    expect(unlikeArgs).toHaveProperty('bucketlistId');
    expect(unlikeArgs.bucketlistId.type).toEqual(new GraphQLNonNull(GraphQLString));
  });
});
