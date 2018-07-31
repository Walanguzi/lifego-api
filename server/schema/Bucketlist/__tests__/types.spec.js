const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require('graphql');
const {
  bucketlist,
  bucketlists,
} = require('../types');

const { like } = require('../../Like/types');
const { comment } = require('../../Comment/types');
const { item } = require('../../Item/types');

describe('Bucketlist type tests', () => {
  test('Should have all model fields', () => {
    expect(bucketlist.getFields()).toHaveProperty('id');
    expect(bucketlist.getFields()).toHaveProperty('name');
    expect(bucketlist.getFields()).toHaveProperty('description');
    expect(bucketlist.getFields()).toHaveProperty('userId');
    expect(bucketlist.getFields()).toHaveProperty('createdBy');
    expect(bucketlist.getFields()).toHaveProperty('dueDate');
    expect(bucketlist.getFields()).toHaveProperty('category');
    expect(bucketlist.getFields()).toHaveProperty('location');
    expect(bucketlist.getFields()).toHaveProperty('pictureUrl');
    expect(bucketlist.getFields()).toHaveProperty('privacy');
    expect(bucketlist.getFields()).toHaveProperty('likes');
    expect(bucketlist.getFields()).toHaveProperty('items');
    expect(bucketlist.getFields()).toHaveProperty('comments');
  });

  test('Should have correct field types', () => {
    expect(bucketlist.getFields().id.type)
      .toEqual(new GraphQLNonNull(GraphQLString));
    expect(bucketlist.getFields().name.type)
      .toEqual(new GraphQLNonNull(GraphQLString));
    expect(bucketlist.getFields().description.type)
      .toEqual(GraphQLString);
    expect(bucketlist.getFields().userId.type)
      .toEqual(GraphQLString);
    expect(bucketlist.getFields().createdBy.type)
      .toEqual(new GraphQLNonNull(GraphQLString));
    expect(bucketlist.getFields().dueDate.type)
      .toEqual(GraphQLString);
    expect(bucketlist.getFields().category.type)
      .toEqual(GraphQLString);
    expect(bucketlist.getFields().location.type)
      .toEqual(GraphQLString);
    expect(bucketlist.getFields().pictureUrl.type)
      .toEqual(GraphQLString);
    expect(bucketlist.getFields().privacy.type)
      .toEqual(new GraphQLNonNull(GraphQLString));
    expect(bucketlist.getFields().likes.type)
      .toEqual(new GraphQLList(like));
    expect(bucketlist.getFields().comments.type)
      .toEqual(new GraphQLList(comment));
    expect(bucketlist.getFields().items.type)
      .toEqual(new GraphQLList(item));
  });
});

describe('Bucketlists type tests', () => {
  test('Should have all return fields', () => {
    expect(bucketlists.getFields()).toHaveProperty('bucketlists');
    expect(bucketlists.getFields()).toHaveProperty('nextOffset');
    expect(bucketlists.getFields()).toHaveProperty('prevOffset');
  });

  test('Should have correct field types', () => {
    expect(bucketlists.getFields().nextOffset.type)
      .toEqual(GraphQLInt);
    expect(bucketlists.getFields().prevOffset.type)
      .toEqual(GraphQLInt);
    expect(bucketlists.getFields().bucketlists.type)
      .toEqual(new GraphQLList(bucketlist));
  });
});
