const { fn } = require('sequelize');
const { findAndCount } = require('../../utils');
const {
  filterByPrivacy,
  addOtherProps,
  getAssociationOptions,
} = require('../../helpers/bucketlistHelper');

module.exports = async (root, args, context) => {
  const { name, offset: off, limit: lim } = args;
  const offset = off || 0;
  const limit = lim || 50;
  const associationOptions = getAssociationOptions();

  const { count, rows } = await findAndCount('bucketlists', {
    offset,
    limit,
    where: {
      name: { $ilike: name ? fn('lower', `${name.toLowerCase()}%`) : '' },
    },
    ...associationOptions,
  });

  let bucketlists = await filterByPrivacy(rows, context);

  bucketlists = await addOtherProps({
    count,
    rows: bucketlists,
    offset,
    limit,
  });

  return bucketlists;
};
