const {
  findById,
  getModel,
  findOne,
  asyncForEach,
  updateSchedule,
  cancelSchedule,
  scheduleEmail,
} = require('../utils');

const Item = getModel('items');
const Comment = getModel('comments');
const Like = getModel('likes');

const filterByPrivacy = async (rows, context) => {
  const bucketlists = [];

  await asyncForEach(rows, async (bucketlist) => {
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

    if (bucketlist.userId === context.decoded.id) {
      bucketlists.push(bucketlist);
    }

    if (user) {
      const friendIds = user.friends.map(friend => friend.id);

      if (friendIds.includes(context.decoded.id) && (bucketlist.privacy === 'everyone' || bucketlist.privacy === 'friends')) {
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
  ...getAssociationOptions(),
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

  const user = await findById('users', bucketlist.dataValues.userId);

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

const handleDueDate = async ({ body, context, bucketlist }) => {
  let data = body;
  const { reminders } = await findById('users', context.decoded.id, {});

  if (reminders && body.dueDate !== bucketlist.dataValues.dueDate) {
    if (bucketlist.dataValues.dueDate) {
      if (body.dueDate !== null) {
        await updateSchedule({
          bucketlist: {
            name: bucketlist.dataValues.name,
            jobId: bucketlist.dataValues.jobId,
            dueDate: body.dueDate,
          },
          context,
        });
      } else {
        await cancelSchedule(bucketlist.dataValues.jobId);
      }
    } else {
      const { data: { id: jobId } } = await scheduleEmail({
        bucketlist: {
          name: bucketlist.dataValues.name,
          dueDate: body.dueDate,
        },
        context,
      });

      data = {
        ...data,
        jobId,
      };
    }
  }

  return data;
};

module.exports = {
  filterByPrivacy,
  getAssociationOptions,
  findBucketlist,
  addUserProperties,
  addListUserProperties,
  addOtherProps,
  addCommentUserDetails,
  handleDueDate,
};
