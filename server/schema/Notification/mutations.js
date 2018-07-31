const {
  notification,
  notifications,
} = require('./types');
const {
  markAsReadArgs,
  deleteNotificationArgs,
} = require('./arguments');
const {
  markAsRead,
  deleteNotification,
  getNotifications,
} = require('../../lib/resolvers/notifications');
const { successMessage } = require('../Common/types');

module.exports = {
  getNotifications: {
    resolve: getNotifications,
    type: notifications,
  },
  markNotificationAsRead: {
    type: notification,
    args: markAsReadArgs,
    resolve: markAsRead,
  },
  deleteNotification: {
    type: successMessage,
    args: deleteNotificationArgs,
    resolve: deleteNotification,
  },
};
