const { like } = require('./types');
const {
  likeArgs,
  unlikeArgs,
} = require('./arguments');
const {
  unlike,
  like: likeBucketlist,
} = require('../../lib/resolvers/likes');
const { successMessage } = require('../Common/types');

module.exports = {
  like: {
    type: like,
    args: likeArgs,
    resolve: likeBucketlist,
  },
  unlike: {
    type: successMessage,
    args: unlikeArgs,
    resolve: unlike,
  },
};
