const { GraphQLList } = require('graphql');
const type = require('./type');
const createBucketlist = require('../../lib/resolvers/bucketlists/create');
const { createBucketlistArgs, updatBucketlistArgs } = require('./arguments');
const {
  list,
  getBucketlist,
  deleteBucketlist,
  listAll,
  explore,
  updatBucketlist,
  getBucketlistArgs,
} = require('../../lib/resolvers/bucketlists');
const { DeleteMessage } = require('../Common');

module.exports = {
  createBucketlist: {
    type,
    args: createBucketlistArgs,
    resolve: createBucketlist,
  },
  getBucketlist: {
    type,
    args: getBucketlistArgs,
    resolve: getBucketlist,
  },
  updateBucketlist: {
    type,
    args: updatBucketlistArgs,
    resolve: updatBucketlist,
  },
  list: {
    type: new GraphQLList(type),
    resolve: list,
  },
  listAll: {
    type: new GraphQLList(type),
    resolve: listAll,
  },
  explore: {
    type: new GraphQLList(type),
    resolve: explore,
  },
  deleteBucketlist: {
    type: DeleteMessage,
    resolve: deleteBucketlist,
  },
};
