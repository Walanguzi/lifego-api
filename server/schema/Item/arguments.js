const {
  GraphQLNonNull,
  GraphQLString,
} = require('graphql');

const createItemArgs = {
  name: {
    type: new GraphQLNonNull(GraphQLString),
  },
  bucketlistId: {
    type: new GraphQLNonNull(GraphQLString),
  },
};

const getItemArgs = {
  id: {
    type: new GraphQLNonNull(GraphQLString),
  },
  bucketlistId: {
    type: new GraphQLNonNull(GraphQLString),
  },
};

const updateItemArgs = {
  ...createItemArgs,
  ...getItemArgs,
};

const deleteItemArgs = getItemArgs;

module.exports = {
  createItemArgs,
  updateItemArgs,
  deleteItemArgs,
};
