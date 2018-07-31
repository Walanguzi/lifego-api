const { notification } = require('../types');
const {
  markAsReadArgs,
  deleteNotificationArgs,
} = require('../arguments');
const notificationResolvers = require('../../../lib/resolvers/notifications');
const { successMessage } = require('../../Common/types');

const {
  markNotificationAsRead,
  deleteNotification,
} = require('../mutations');

describe('Notification mutation tests', () => {
  test('deleteNotification mutation', () => {
    expect(deleteNotification).toHaveProperty('type');
    expect(deleteNotification.type).toEqual(successMessage);

    expect(deleteNotification).toHaveProperty('args');
    expect(deleteNotification.args).toEqual(deleteNotificationArgs);

    expect(deleteNotification).toHaveProperty('resolve');
    expect(deleteNotification.resolve).toEqual(notificationResolvers.deleteNotification);
  });

  test('markNotificationAsRead mutation', () => {
    expect(markNotificationAsRead).toHaveProperty('type');
    expect(markNotificationAsRead.type).toEqual(notification);

    expect(markNotificationAsRead).toHaveProperty('args');
    expect(markNotificationAsRead.args).toEqual(markAsReadArgs);

    expect(markNotificationAsRead).toHaveProperty('resolve');
    expect(markNotificationAsRead.resolve).toEqual(notificationResolvers.markAsRead);
  });
});
