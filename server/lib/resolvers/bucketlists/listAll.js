const { Op: { iLike } } = require('sequelize');
const { findAll } = require('../../utils');
const { filterByPrivacy, getAssociationOptions } = require('../../helpers/bucketlistHelper');

module.exports = async (root, args, context) => {
  const { name, offset: off, limit: lim } = args;
  const offset = off || 0;
  const limit = lim || 50;
  const associationOptions = getAssociationOptions();

  const rows = await findAll('bucketlists', {
    offset,
    limit,
    where: {
      name: { [iLike]: `%${name || ''}%` },
    },
    ...associationOptions,
  });

  const bucketlists = filterByPrivacy(rows, context);

  const count = bucketlists.length;
  const nextOffset = count > (offset + limit) ? offset + limit : null;
  const prevOffset = offset > 0 ? offset - limit : null;
  return { bucketlists, nextOffset, prevOffset };
};
