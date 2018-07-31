const {
  GraphQLNonNull,
  GraphQLString,
} = require('graphql');

const markAsUserReadArgs = {
  id: {
    type: new GraphQLNonNull(GraphQLString),
  },
};

const deleteUserNotificationArgs = markAsUserReadArgs;

module.exports = {
  markAsUserReadArgs,
  deleteUserNotificationArgs,
};
