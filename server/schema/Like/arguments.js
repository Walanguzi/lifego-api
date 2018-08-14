const {
  GraphQLNonNull,
  GraphQLString,
} = require('graphql');

const likeArgs = {
  bucketlistId: {
    type: new GraphQLNonNull(GraphQLString),
  },
};

const unlikeArgs = {
  id: {
    type: new GraphQLNonNull(GraphQLString),
  },
  bucketlistId: {
    type: new GraphQLNonNull(GraphQLString),
  },
};

module.exports = {
  likeArgs,
  unlikeArgs,
};
