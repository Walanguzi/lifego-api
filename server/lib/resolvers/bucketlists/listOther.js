const { fn } = require('sequelize');
const { findAndCount } = require('../../utils');
const {
  getAssociationOptions,
  addOtherProps,
} = require('../../helpers/bucketlistHelper');

module.exports = async (root, args) => {
  const {
    name, offset: off, limit: lim, id,
  } = args;

  const offset = off || 0;
  const limit = lim || 50;
  const associationOptions = getAssociationOptions();

  const { count, rows } = await findAndCount('bucketlists', {
    offset,
    limit,
    where: {
      name: { $ilike: fn('lower', `${name.toLowerCase()}%`) },
      userId: id,
    },
    ...associationOptions,
  });

  const bucketlists = await addOtherProps({
    count,
    rows,
    offset,
    limit,
  });

  return bucketlists;
};
