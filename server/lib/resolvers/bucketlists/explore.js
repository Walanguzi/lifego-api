const { Op: { iLike }, fn } = require('sequelize');
const { findAll } = require('../../utils');
const { getAssociationOptions, addListUserProperties } = require('../../helpers/bucketlistHelper');

module.exports = async (root, args) => {
  const { name, offset: off, limit: lim } = args;
  const offset = off || 0;
  const limit = lim || 50;
  const associationOptions = getAssociationOptions();

  let bucketlists = await findAll('bucketlists', {
    offset,
    limit,
    where: {
      name: { [iLike]: `%${name || ''}%` },
      privacy: 'everyone',
    },
    ...associationOptions,
    order: [fn('RANDOM')],
  });

  bucketlists = await addListUserProperties(bucketlists);
  const count = bucketlists.length;
  const nextOffset = count > (offset + limit) ? offset + limit : null;
  const prevOffset = offset > 0 ? offset - limit : null;
  return { bucketlists, nextOffset, prevOffset };
};
