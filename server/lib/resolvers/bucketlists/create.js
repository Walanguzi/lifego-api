const { createRecord, generateError } = require('../../utils');

const { addUserProperties } = require('../../helpers/bucketlistHelper');

module.exports = async (root, body, context) => {
  if (body.name) {
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
