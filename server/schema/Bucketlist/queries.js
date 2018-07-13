const {
  GraphQLObjectType,
  GraphQLList,
} = require('graphql');
const type = require('./type');
const list = require('../../lib/resolvers/bucketlists/list');
const getBucketlist = require('../../lib/resolvers/bucketlists/getOne');

module.exports = new GraphQLObjectType({
  getBucketlist: {
    type,
    resolve: getBucketlist,
  },
  list: {
    type: new GraphQLList(type),
    resolve: list,
  },
});
