const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
} = require('graphql');

const createMessageArgs = {
  content: {
    type: new GraphQLNonNull(GraphQLString),
  },
  conversationId: {
    type: new GraphQLNonNull(GraphQLString),
  },
  read: {
    type: GraphQLBoolean,
  },
};

const getMessageArgs = {
  id: {
    type: new GraphQLNonNull(GraphQLString),
  },
  conversationId: {
    type: new GraphQLNonNull(GraphQLString),
  },
};

const updateMessageArgs = {
  ...createMessageArgs,
  ...getMessageArgs,
};

const deleteMessageArgs = getMessageArgs;

module.exports = {
  createMessageArgs,
  updateMessageArgs,
  deleteMessageArgs,
};
