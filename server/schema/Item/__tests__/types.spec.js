const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
} = require('graphql');
const { item } = require('../types');

describe('Item type tests', () => {
  test('Should have all model fields', () => {
    expect(item.getFields()).toHaveProperty('id');
    expect(item.getFields().id.type).toEqual(new GraphQLNonNull(GraphQLString));

    expect(item.getFields()).toHaveProperty('name');
    expect(item.getFields().name.type).toEqual(new GraphQLNonNull(GraphQLString));

    expect(item.getFields()).toHaveProperty('bucketlistId');
    expect(item.getFields().bucketlistId.type).toEqual(new GraphQLNonNull(GraphQLString));

    expect(item.getFields()).toHaveProperty('done');
    expect(item.getFields().done.type).toEqual(new GraphQLNonNull(GraphQLBoolean));
  });
});
