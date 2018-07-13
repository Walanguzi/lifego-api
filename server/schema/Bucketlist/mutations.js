const type = require('./type');
const createBucketlist = require('../../lib/resolvers/bucketlists/create');
const { createBucketlistArgs } = require('./arguments');

module.exports = {
  createBucketlist: {
    type,
    args: createBucketlistArgs,
    resolve: createBucketlist,
  },
};
