const {
  GraphQLNonNull,
  GraphQLString,
} = require('graphql');

const {
  markAsReadArgs,
  deleteNotificationArgs,
} = require('../arguments');

describe('Notification arguments tests', () => {
  test('markAsReadArgs types', () => {
    expect(markAsReadArgs).toHaveProperty('id');
    expect(markAsReadArgs.id.type).toEqual(new GraphQLNonNull(GraphQLString));
  });

  test('deleteNotificationArgs types', () => {
    expect(deleteNotificationArgs).toHaveProperty('id');
    expect(deleteNotificationArgs.id.type).toEqual(new GraphQLNonNull(GraphQLString));
  });
});
