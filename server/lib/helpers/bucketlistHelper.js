const {
  findById, getModel, findOne, asyncForEach,
} = require('../utils');

const Item = getModel('items');
const Comment = getModel('comments');
const Like = getModel('likes');

const filterByPrivacy = async (rows, context) => {
  const bucketlists = [];
  await asyncForEach(rows, async (bucketlist) => {
    if (bucketlist.privacy === 'everyone') {
      bucketlists.push(bucketlist);
    }

    if (bucketlist.privacy === 'friends') {
      const user = await findById('users', bucketlist.userId, {
        include: [
          {
            model: getModel('users'),
            as: 'friends',
            attributes: {
              exclude: ['password', 'createdAt', 'updatedAt'],
            },
          },
        ],
      });

      const friendIds = user.friends.map(friend => friend.id);

      if (friendIds.includes(context.decoded.id)) {
        bucketlists.push(bucketlist);
      }
    }
  });

  return bucketlists;
};

const getAssociationOptions = () => ({
  include: [
    {
      model: Item,
      as: 'items',
    }, {
      model: Comment,
      as: 'comments',
    }, {
      model: Like,
      as: 'likes',
    },
  ],
  order: [
    ['createdAt', 'DESC'],
    [Item, 'createdAt', 'ASC'],
    [Comment, 'createdAt', 'DESC'],
    [Like, 'createdAt', 'DESC'],
  ],
});

const findBucketlist = (id, context) => findOne('bucketlists', {
  where: {
    id,
    userId: context.decoded.id,
  },
});

const addCommentUserDetails = async ({ dataValues: comment }) => {
  const user = await findById('users', comment.senderId);

  return ({
    ...comment,
    user: user.dataValues.displayName,
    userPictureUrl: user.dataValues.pictureUrl,
  });
};

const addUserProperties = async (bucketlist) => {
  const comments = [];

  await asyncForEach(bucketlist.comments, async (comment) => {
    comments.push(await addCommentUserDetails(comment));
  });

  const user = await findById('users', bucketlist.userId);

  return {
    ...bucketlist.dataValues,
    comments,
    user: user.dataValues.displayName,
    userPictureUrl: user.dataValues.pictureUrl,
  };
};

const addListUserProperties = async (bucketlists) => {
  const returnBucketlists = [];

  await asyncForEach(bucketlists, async (bucketlist) => {
    const newBucketlist = await addUserProperties(bucketlist);

    returnBucketlists.push(newBucketlist);
  });

  return returnBucketlists;
};

const addOtherProps = async ({
  rows, offset, limit, count,
}) => {
  const bucketlists = await addListUserProperties(rows);

  const nextOffset = count > (offset + limit) ? offset + limit : null;
  const prevOffset = offset > 0 ? offset - limit : null;

  return { bucketlists, nextOffset, prevOffset };
};

module.exports = {
  filterByPrivacy,
  getAssociationOptions,
  findBucketlist,
  addUserProperties,
  addListUserProperties,
  addOtherProps,
  addCommentUserDetails,
};
