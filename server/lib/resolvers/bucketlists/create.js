
const { bucketlists } = require('../../../models');

module.exports = async (root, body, context) => {
  if (body.name) {
    const [bucketlist, created] = await bucketlists.findOrCreate({
      where: {
        name: body.name,
        userId: context.decoded.id,
      },
      plain: true,
      defaults: {
        ...body,
        privacy: body.privacy || context.decoded.privacy || 'friends',
        createdBy: context.decoded.displayName,
        userId: context.decoded.id,
      },
    });
    if (created) {
      return bucketlist;
    }
    return Object.assign(new Error('Name already in use'), { extensions: { code: 409 } });
  }
  return Object.assign(new Error('Missing name'), { extensions: { code: 400 } });
};
