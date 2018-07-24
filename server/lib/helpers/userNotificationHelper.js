const create = require('../resolvers/userNotifications/create');
const { findById, asyncForEach } = require('../utils');

const createAddNotification = async (context, friend) => create({
  type: 'new',
  userId: context.decoded.id,
  friendId: friend.id,
  text: `<b>${context.decoded.displayName}<b> added you as a friend.`,
}, context);

const addDetails = async (userNotifications) => {
  let read = [];
  let unread = [];
  await asyncForEach(userNotifications, async ({ dataValues: notif }) => {
    const sourceUser = await findById('users', notif.friendId);

    const newNotification = {
      ...notif,
      user: sourceUser.displayName,
      userPictureUrl: sourceUser.pictureUrl,
    };

    if (newNotification.read) {
      read.push(newNotification);
    } else {
      unread.push(newNotification);
    }
  });

  read = read.sort((a, b) => new Date(b.date) - new Date(a.date));
  unread = unread.sort((a, b) => new Date(b.date) - new Date(a.date));

  return {
    read,
    unread,
  };
};

module.exports = {
  createAddNotification,
  addDetails,
};
