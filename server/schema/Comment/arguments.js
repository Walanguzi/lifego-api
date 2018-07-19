const {
  GraphQLNonNull,
  GraphQLString,
} = require('graphql');

const createCommentArgs = {
  content: {
    type: new GraphQLNonNull(GraphQLString),
  },
  bucketlistId: {
    type: new GraphQLNonNull(GraphQLString),
  },
};

const getCommentArgs = {
  id: {
    type: new GraphQLNonNull(GraphQLString),
  },
  bucketlistId: {
    type: new GraphQLNonNull(GraphQLString),
  },
};

const updateCommentArgs = {
  ...createCommentArgs,
  ...getCommentArgs,
};

const deleteCommentArgs = getCommentArgs;

module.exports = {
  createCommentArgs,
  updateCommentArgs,
  deleteCommentArgs,
};
