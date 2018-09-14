const { fn } = require('sequelize');
const { findAndCount } = require('../../utils');
const {
  getAssociationOptions,
  addOtherProps,
} = require('../../helpers/bucketlistHelper');

module.exports = async (root, args) => {
  const { name, offset: off, limit: lim } = args;
  const offset = off || 0;
  const limit = lim || 50;
  const associationOptions = getAssociationOptions();

  const { count, rows } = await findAndCount('bucketlists', {
    offset,
    limit,
    where: {
      name: { $ilike: fn('lower', `${name.toLowerCase()}%`) },
      privacy: 'everyone',
    },
    ...associationOptions,
    order: [fn('RANDOM')],
  });

  const bucketlists = await addOtherProps({
    count,
    rows,
    offset,
    limit,
  });

  return bucketlists;
};
