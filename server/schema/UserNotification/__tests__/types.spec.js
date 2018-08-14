const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} = require('graphql');
const {
  userNotification,
  userNotifications,
} = require('../types');

describe('UserNotification type tests', () => {
  test('Should have all model fields', () => {
    expect(userNotification.getFields()).toHaveProperty('id');
    expect(userNotification.getFields().id.type).toEqual(new GraphQLNonNull(GraphQLString));

    expect(userNotification.getFields()).toHaveProperty('type');
    expect(userNotification.getFields().type.type).toEqual(new GraphQLNonNull(GraphQLString));

    expect(userNotification.getFields()).toHaveProperty('friendId');
    expect(userNotification.getFields().friendId.type)
      .toEqual(new GraphQLNonNull(GraphQLString));

    expect(userNotification.getFields()).toHaveProperty('userId');
    expect(userNotification.getFields().userId.type)
      .toEqual(new GraphQLNonNull(GraphQLString));

    expect(userNotification.getFields()).toHaveProperty('read');
    expect(userNotification.getFields().read.type).toEqual(new GraphQLNonNull(GraphQLBoolean));

    expect(userNotification.getFields()).toHaveProperty('text');
    expect(userNotification.getFields().text.type).toEqual(GraphQLString);

    expect(userNotification.getFields()).toHaveProperty('user');
    expect(userNotification.getFields().user.type).toEqual(GraphQLString);

    expect(userNotification.getFields()).toHaveProperty('userPictureUrl');
    expect(userNotification.getFields().userPictureUrl.type).toEqual(GraphQLString);
  });
});

describe('UserNotifications type tests', () => {
  test('Should have all model fields', () => {
    expect(userNotifications).toEqual(new GraphQLList(userNotification));
  });
});
