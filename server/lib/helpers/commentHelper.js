const { findOne } = require('../utils');

const findComment = body => findOne('comments', {
  where: {
    id: body.id,
    bucketlistId: body.bucketlistId,
  },
});

module.exports = {
  findComment,
};
