const {
  GraphQLNonNull,
  GraphQLString,
} = require('graphql');
const { like } = require('../types');

describe('Like type tests', () => {
  test('Should have all model fields', () => {
    expect(like.getFields()).toHaveProperty('id');
    expect(like.getFields().id.type).toEqual(new GraphQLNonNull(GraphQLString));

    expect(like.getFields()).toHaveProperty('bucketlistId');
    expect(like.getFields().bucketlistId.type).toEqual(new GraphQLNonNull(GraphQLString));

    expect(like.getFields()).toHaveProperty('likerId');
    expect(like.getFields().likerId.type).toEqual(new GraphQLNonNull(GraphQLString));
  });
});
