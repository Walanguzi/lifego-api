const { resolver } = require('graphql-sequelize');

const { Bucketlist } = require('../../../models');

module.exports = async (root, body, context, info) => {
  const bucketlist = await Bucketlist.findOne({
    where: { id: context.params.bucketlistId },
  });
  return resolver(Bucketlist)(root, { bucketlist }, context, info);
};
