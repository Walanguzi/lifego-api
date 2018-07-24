const {
  userNotification,
  userNotifications,
} = require('./types');
const {
  markAsUserReadArgs,
  deleteUserNotificationArgs,
} = require('./arguments');
const {
  markAsUserRead,
  deleteUserNotification,
  getUserNotifications,
} = require('../../lib/resolvers/userNotifications');
const { successMessage } = require('../Common/types');

module.exports = {
  getUserNotifications: {
    resolve: getUserNotifications,
    type: userNotifications,
  },
  markUserNotificationAsRead: {
    type: userNotification,
    args: markAsUserReadArgs,
    resolve: markAsUserRead,
  },
  deleteUserNotification: {
    type: successMessage,
    args: deleteUserNotificationArgs,
    resolve: deleteUserNotification,
  },
};
