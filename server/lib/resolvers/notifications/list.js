const {
  findAll,
  asyncForEach,
} = require('../../utils');
const { addDetails } = require('../../helpers/notificationHelper');

module.exports = async (root, body, context) => {
  const bucketlists = await findAll('bucketlists', {
    where: {
      userId: context.decoded.id,
    },
  });

  let readNotifications = [];
  let unreadNotifications = [];

  await asyncForEach(bucketlists, async ({ id }) => {
    const notifications = await findAll('notifications', {
      where: {
        bucketlistId: id,
        sourceUserId: {
          $ne: context.decoded.id,
        },
      },
      order: [
        ['createdAt', 'DESC'],
      ],
    });

    const { read, unread } = await addDetails(notifications);

    readNotifications = read;
    unreadNotifications = unread;
  });

  return unreadNotifications.concat(readNotifications);
};
