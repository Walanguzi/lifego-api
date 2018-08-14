const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} = require('graphql');
const {
  notification,
  notifications,
} = require('../types');

describe('Notification type tests', () => {
  test('Should have all model fields', () => {
    expect(notification.getFields()).toHaveProperty('id');
    expect(notification.getFields().id.type).toEqual(new GraphQLNonNull(GraphQLString));

    expect(notification.getFields()).toHaveProperty('type');
    expect(notification.getFields().type.type).toEqual(new GraphQLNonNull(GraphQLString));

    expect(notification.getFields()).toHaveProperty('bucketlistId');
    expect(notification.getFields().bucketlistId.type).toEqual(new GraphQLNonNull(GraphQLString));

    expect(notification.getFields()).toHaveProperty('sourceUserId');
    expect(notification.getFields().sourceUserId.type).toEqual(new GraphQLNonNull(GraphQLString));

    expect(notification.getFields()).toHaveProperty('read');
    expect(notification.getFields().read.type).toEqual(new GraphQLNonNull(GraphQLBoolean));

    expect(notification.getFields()).toHaveProperty('text');
    expect(notification.getFields().text.type).toEqual(GraphQLString);

    expect(notification.getFields()).toHaveProperty('user');
    expect(notification.getFields().user.type).toEqual(GraphQLString);

    expect(notification.getFields()).toHaveProperty('userPictureUrl');
    expect(notification.getFields().userPictureUrl.type).toEqual(GraphQLString);
  });
});

describe('Notifications type tests', () => {
  test('Should have all model fields', () => {
    expect(notifications).toEqual(new GraphQLList(notification));
  });
});
