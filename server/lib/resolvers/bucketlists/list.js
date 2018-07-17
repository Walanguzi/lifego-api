const { Op: { iLike } } = require('sequelize');
const { bucketlists: Bucketlist } = require('../../../models');

module.exports = async (root, args) => {
  const { name, offset, limit } = args;
  const bucketlists = await Bucketlist.findAll({
    offset: offset || 0,
    limit: limit || 50,
    where: {
      name: { [iLike]: `%${name || ''}%` },
    },
    order: [['name', 'ASC']],
    plain: true,
  });
  return bucketlists;
};
