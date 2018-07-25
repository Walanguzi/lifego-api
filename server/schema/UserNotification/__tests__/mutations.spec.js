const { userNotification } = require('../types');
const {
  markAsUserReadArgs,
  deleteUserNotificationArgs,
} = require('../arguments');
const userNotificationResolvers = require('../../../lib/resolvers/userNotifications');
const { successMessage } = require('../../Common/types');

const {
  markUserNotificationAsRead,
  deleteUserNotification,
} = require('../mutations');

describe('UserNotification mutation tests', () => {
  test('deleteUserNotification mutation', () => {
    expect(deleteUserNotification).toHaveProperty('type');
    expect(deleteUserNotification.type).toEqual(successMessage);

    expect(deleteUserNotification).toHaveProperty('args');
    expect(deleteUserNotification.args).toEqual(deleteUserNotificationArgs);

    expect(deleteUserNotification).toHaveProperty('resolve');
    expect(deleteUserNotification.resolve)
      .toEqual(userNotificationResolvers.deleteUserNotification);
  });

  test('markUserNotificationAsRead mutation', () => {
    expect(markUserNotificationAsRead).toHaveProperty('type');
    expect(markUserNotificationAsRead.type).toEqual(userNotification);

    expect(markUserNotificationAsRead).toHaveProperty('args');
    expect(markUserNotificationAsRead.args).toEqual(markAsUserReadArgs);

    expect(markUserNotificationAsRead).toHaveProperty('resolve');
    expect(markUserNotificationAsRead.resolve)
      .toEqual(userNotificationResolvers.markAsUserRead);
  });
});
