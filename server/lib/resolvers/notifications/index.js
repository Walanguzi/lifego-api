const createNotification = require('./create');
const markAsRead = require('./update');
const deleteNotification = require('./delete');
const getNotifications = require('./list');

module.exports = {
  createNotification,
  markAsRead,
  deleteNotification,
  getNotifications,
};
