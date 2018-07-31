const {
  GraphQLNonNull,
  GraphQLString,
} = require('graphql');

const {
  markAsUserReadArgs,
  deleteUserNotificationArgs,
} = require('../arguments');

describe('UserNotification arguments tests', () => {
  test('markAsUserReadArgs types', () => {
    expect(markAsUserReadArgs).toHaveProperty('id');
    expect(markAsUserReadArgs.id.type).toEqual(new GraphQLNonNull(GraphQLString));
  });

  test('deleteUserNotificationArgs types', () => {
    expect(deleteUserNotificationArgs).toHaveProperty('id');
    expect(deleteUserNotificationArgs.id.type).toEqual(new GraphQLNonNull(GraphQLString));
  });
});
