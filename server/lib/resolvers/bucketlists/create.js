const { resolver } = require('graphql-sequelize');

const { Bucketlist } = require('../../../models');

module.exports = async (root, body, context, info) => {
  const bucketlist = await Bucketlist.create({
    ...body,
    createdBy: context.decoded.userDisplayName,
    userId: context.decoded.id,
  });
  return resolver(Bucketlist)(root, { bucketlist }, context, info);
};
