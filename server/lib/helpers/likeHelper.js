const { findOne } = require('../utils');

const findLike = (id, context) => findOne('likes', {
  where: {
    id,
    likerId: context.decoded.id,
  },
});

module.exports = {
  findLike,
};
