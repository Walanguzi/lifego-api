const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
} = require('graphql');

const {
  createItemArgs,
  updateItemArgs,
  deleteItemArgs,
} = require('../arguments');

describe('Item arguments tests', () => {
  test('createItemArgs types', () => {
    expect(createItemArgs).toHaveProperty('name');
    expect(createItemArgs.name.type).toEqual(new GraphQLNonNull(GraphQLString));

    expect(createItemArgs).toHaveProperty('done');
    expect(createItemArgs.done.type).toEqual(GraphQLBoolean);

    expect(createItemArgs).toHaveProperty('bucketlistId');
    expect(createItemArgs.bucketlistId.type).toEqual(new GraphQLNonNull(GraphQLString));
  });

  test('updateItemArgs types', () => {
    expect(updateItemArgs).toHaveProperty('id');
    expect(updateItemArgs.id.type).toEqual(new GraphQLNonNull(GraphQLString));

    expect(updateItemArgs).toHaveProperty('name');
    expect(updateItemArgs.name.type).toEqual(new GraphQLNonNull(GraphQLString));

    expect(createItemArgs).toHaveProperty('done');
    expect(createItemArgs.done.type).toEqual(GraphQLBoolean);

    expect(updateItemArgs).toHaveProperty('bucketlistId');
    expect(updateItemArgs.bucketlistId.type).toEqual(new GraphQLNonNull(GraphQLString));
  });

  test('deleteItemArgs types', () => {
    expect(deleteItemArgs).toHaveProperty('id');
    expect(deleteItemArgs.id.type).toEqual(new GraphQLNonNull(GraphQLString));

    expect(deleteItemArgs).toHaveProperty('bucketlistId');
    expect(deleteItemArgs.bucketlistId.type).toEqual(new GraphQLNonNull(GraphQLString));
  });
});
