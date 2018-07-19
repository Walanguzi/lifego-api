const { Op: { iLike } } = require('sequelize');
const { findAndCount } = require('../../utils');
const { getAssociationOptions } = require('../../helpers/bucketlistHelper');

module.exports = async (root, args, context) => {
  const { name, offset: off, limit: lim } = args;
  const offset = off || 0;
  const limit = lim || 50;
  const associationOptions = getAssociationOptions();

  const { count, rows: bucketlists } = await findAndCount('bucketlists', {
    offset,
    limit,
    where: {
      name: { [iLike]: `%${name || ''}%` },
      userId: context.decoded.id,
    },
    ...associationOptions,
  });

  const nextOffset = count > (offset + limit) ? offset + limit : null;
  const prevOffset = offset > 0 ? offset - limit : null;
  return { bucketlists, nextOffset, prevOffset };
};
