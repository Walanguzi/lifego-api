const {
  createRecord,
  generateError,
  scheduleEmail,
  findById,
} = require('../../utils');

const { addUserProperties } = require('../../helpers/bucketlistHelper');

module.exports = async (root, body, context) => {
  if (body.name) {
    const { reminders } = await findById('users', context.decoded.id, {});

    const [returnedBucketlist, created] = await createRecord('bucketlists', {
      where: {
        name: body.name,
        userId: context.decoded.id,
      },
    },
    {
      ...body,
      privacy: body.privacy || context.decoded.privacy || 'friends',
      createdBy: context.decoded.displayName,
      userId: context.decoded.id,
    });

    if (created) {
      let bucketlist = await addUserProperties({
        ...returnedBucketlist,
        comments: [],
      });

      bucketlist = {
        ...bucketlist,
        likes: [],
        items: [],
      };

      if (body.dueDate && reminders === true) {
        await scheduleEmail({ bucketlist, context });
      }

      context.socket.emit('bucketlists', {
        type: 'new',
        bucketlist,
      });

      return bucketlist;
    }

    return generateError({
      message: 'Name already in use',
      code: 409,
    });
  }

  return generateError({
    message: 'Missing name',
    code: 400,
  });
};
