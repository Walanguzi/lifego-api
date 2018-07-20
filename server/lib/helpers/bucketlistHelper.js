const {
  findById, getModel, findOne, asyncForEach,
} = require('../utils');

const Item = getModel('items');
const Comment = getModel('comments');
const Like = getModel('likes');

const filterByPrivacy = (rows, context) => rows.filter(async (bucketlist) => {
  if (bucketlist.privacy === 'everyone') {
    return true;
  }
  if (bucketlist.privacy === 'friends') {
    const user = await findById('users', bucketlist.id, {
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
      return true;
    }
    return false;
  }
  return false;
});

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

const addCommentUserDetails = async (comment) => {
  const user = await findById('users', comment.senderId);
  return ({
    ...comment.dataValues,
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
    returnBucketlists.push(await addUserProperties(bucketlist));
  });
  return returnBucketlists;
};

module.exports = {
  filterByPrivacy,
  getAssociationOptions,
  findBucketlist,
  addUserProperties,
  addListUserProperties,
};
