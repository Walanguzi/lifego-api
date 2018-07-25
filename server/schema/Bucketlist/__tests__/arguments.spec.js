const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} = require('graphql');

const {
  createBucketlistArgs,
  updateBucketlistArgs,
  getBucketlistArgs,
  deleteBucketlistArgs,
  listArgs,
} = require('../arguments');

describe('Bucketlist arguments tests', () => {
  test('createBucketlistArgs types', () => {
    expect(createBucketlistArgs).toHaveProperty('name');
    expect(createBucketlistArgs.name.type).toEqual(new GraphQLNonNull(GraphQLString));

    expect(createBucketlistArgs).toHaveProperty('description');
    expect(createBucketlistArgs.description.type).toEqual(GraphQLString);

    expect(createBucketlistArgs).toHaveProperty('location');
    expect(createBucketlistArgs.location.type).toEqual(GraphQLString);

    expect(createBucketlistArgs).toHaveProperty('category');
    expect(createBucketlistArgs.category.type).toEqual(GraphQLString);

    expect(createBucketlistArgs).toHaveProperty('dueDate');
    expect(createBucketlistArgs.dueDate.type).toEqual(GraphQLString);

    expect(createBucketlistArgs).toHaveProperty('pictureUrl');
    expect(createBucketlistArgs.pictureUrl.type).toEqual(GraphQLString);

    expect(createBucketlistArgs).toHaveProperty('privacy');
    expect(createBucketlistArgs.privacy.type).toEqual(GraphQLString);
  });

  test('getBucketlistArgs types', () => {
    expect(getBucketlistArgs).toHaveProperty('id');
    expect(getBucketlistArgs.id.type).toEqual(new GraphQLNonNull(GraphQLString));
  });

  test('updateBucketlistArgs types', () => {
    expect(updateBucketlistArgs).toHaveProperty('id');
    expect(updateBucketlistArgs.id.type).toEqual(new GraphQLNonNull(GraphQLString));
  });

  test('deleteBucketlistArgs types', () => {
    expect(deleteBucketlistArgs).toHaveProperty('id');
    expect(deleteBucketlistArgs.id.type).toEqual(new GraphQLNonNull(GraphQLString));
  });

  test('listArgs types', () => {
    expect(listArgs).toHaveProperty('offset');
    expect(listArgs.offset.type).toEqual(GraphQLInt);

    expect(listArgs).toHaveProperty('limit');
    expect(listArgs.limit.type).toEqual(GraphQLInt);

    expect(listArgs).toHaveProperty('name');
    expect(listArgs.name.type).toEqual(GraphQLString);
  });
});
