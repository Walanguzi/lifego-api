const {
  GraphQLNonNull,
  GraphQLString,
} = require('graphql');

const startConversationArgs = {
  receiverId: {
    type: new GraphQLNonNull(GraphQLString),
  },
};

const deleteConversationArgs = {
  id: {
    type: new GraphQLNonNull(GraphQLString),
  },
};

module.exports = {
  startConversationArgs,
  deleteConversationArgs,
};
