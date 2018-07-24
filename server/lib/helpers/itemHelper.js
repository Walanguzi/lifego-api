const { findOne } = require('../utils');

const findItem = body => findOne('items', {
  where: {
    id: body.id,
    bucketlistId: body.bucketlistId,
  },
});

module.exports = {
  findItem,
};
