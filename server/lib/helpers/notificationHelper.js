const create = require('../resolvers/notifications/create');
const { findById, asyncForEach } = require('../utils');

const createCommentNotification = async (context, comment) => create({
  type: 'comment',
  sourceUserId: context.decoded.id,
  bucketlistId: comment.bucketlistId,
  text: comment.content,
}, context);

const createLikeNotification = async (context, like) => create({
  type: 'like',
  sourceUserId: context.decoded.id,
  bucketlistId: like.bucketlistId,
  text: 'new like',
}, context);

const addDetails = async (notifications) => {
  let read = [];
  let unread = [];
  await asyncForEach(notifications, async ({ dataValues: notif }) => {
    const sourceUser = await findById('users', notif.sourceUserId);

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

  read = read.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  unread = unread.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return {
    read,
    unread,
  };
};

module.exports = {
  createCommentNotification,
  createLikeNotification,
  addDetails,
};
