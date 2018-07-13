const { resolver } = require('graphql-sequelize');
const { Op: { iLike } } = require('sequelize');
const { Bucketlist } = require('../../../models');

module.exports = async (root, body, context, info) => resolver(Bucketlist, {
  dataLoader: false,
  before: (findOptions) => {
    const { query: { name, offset, limit } } = context;
    return ({
      offset,
      limit,
      where: {
        name: { [iLike]: `%${name}%` },
      },
      order: [['name', 'ASC']],
      ...findOptions,
    });
  },
  after: result => result,
}, context, info);
