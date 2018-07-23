const {
  GraphQLNonNull,
  GraphQLString,
} = require('graphql');

const markAsReadArgs = {
  id: {
    type: new GraphQLNonNull(GraphQLString),
  },
};

const deleteNotificationArgs = markAsReadArgs;

module.exports = {
  markAsReadArgs,
  deleteNotificationArgs,
};
