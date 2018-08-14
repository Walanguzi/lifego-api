const {
  bucketlist,
  bucketlists,
} = require('./types');
const {
  createBucketlistArgs,
  updateBucketlistArgs,
  getBucketlistArgs,
  deleteBucketlistArgs,
  listArgs,
  listOtherArgs,
} = require('./arguments');
const {
  list,
  getBucketlist,
  deleteBucketlist,
  listAll,
  listOther,
  explore,
  updateBucketlist,
  createBucketlist,
} = require('../../lib/resolvers/bucketlists');
const { successMessage } = require('../Common/types');

module.exports = {
  createBucketlist: {
    type: bucketlist,
    args: createBucketlistArgs,
    resolve: createBucketlist,
  },
  getBucketlist: {
    type: bucketlist,
    args: getBucketlistArgs,
    resolve: getBucketlist,
  },
  updateBucketlist: {
    type: bucketlist,
    args: updateBucketlistArgs,
    resolve: updateBucketlist,
  },
  list: {
    type: bucketlists,
    args: listArgs,
    resolve: list,
  },
  listAll: {
    type: bucketlists,
    args: listArgs,
    resolve: listAll,
  },
  listOther: {
    type: bucketlists,
    args: listOtherArgs,
    resolve: listOther,
  },
  explore: {
    type: bucketlists,
    args: listArgs,
    resolve: explore,
  },
  deleteBucketlist: {
    type: successMessage,
    args: deleteBucketlistArgs,
    resolve: deleteBucketlist,
  },
};
