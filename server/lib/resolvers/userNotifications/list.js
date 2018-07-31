const { findAll } = require('../../utils');
const { addDetails } = require('../../helpers/userNotificationHelper');

module.exports = async (root, body, context) => {
  let readNotifications = [];
  let unreadNotifications = [];

  const userNotifications = await findAll('userNotifications', {
    where: {
      userId: context.decoded.id,
    },
    order: [
      ['createdAt', 'DESC'],
    ],
  });

  const { read, unread } = await addDetails(userNotifications);

  readNotifications = read;
  unreadNotifications = unread;

  return unreadNotifications.concat(readNotifications);
};
