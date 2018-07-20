const { Op: { iLike } } = require('sequelize');
const { findAndCount } = require('../../utils');
const { getAssociationOptions, addListUserProperties } = require('../../helpers/bucketlistHelper');

module.exports = async (root, args, context) => {
  const { name, offset: off, limit: lim } = args;
  const offset = off || 0;
  const limit = lim || 50;
  const associationOptions = getAssociationOptions();

  const { count, rows } = await findAndCount('bucketlists', {
    offset,
    limit,
    where: {
      name: { [iLike]: `%${name || ''}%` },
      userId: context.decoded.id,
    },
    ...associationOptions,
  });

  const bucketlists = await addListUserProperties(rows);

  const nextOffset = count > (offset + limit) ? offset + limit : null;
  const prevOffset = offset > 0 ? offset - limit : null;
  return { bucketlists, nextOffset, prevOffset };
};
