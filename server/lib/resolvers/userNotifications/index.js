const createUserNotification = require('./create');
const markAsUserRead = require('./update');
const deleteUserNotification = require('./delete');
const getUserNotifications = require('./list');

module.exports = {
  createUserNotification,
  markAsUserRead,
  deleteUserNotification,
  getUserNotifications,
};
