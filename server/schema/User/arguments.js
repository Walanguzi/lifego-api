const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
} = require('graphql');

const addFriendArgs = {
  id: {
    type: new GraphQLNonNull(GraphQLString),
  },
};

const removeFriendArgs = addFriendArgs;

const getOtherProfileArgs = addFriendArgs;

const searchUsersArgs = {
  name: {
    type: new GraphQLNonNull(GraphQLString),
  },
};

const deleteAccountArgs = {
  email: {
    type: new GraphQLNonNull(GraphQLString),
  },
  password: {
    type: new GraphQLNonNull(GraphQLString),
  },
};

const updateProfileArgs = {
  displayName: {
    type: GraphQLString,
  },
  pictureUrl: {
    type: GraphQLString,
  },
  privacy: {
    type: GraphQLString,
  },
  reminders: {
    type: GraphQLBoolean,
  },
};

module.exports = {
  addFriendArgs,
  removeFriendArgs,
  getOtherProfileArgs,
  deleteAccountArgs,
  updateProfileArgs,
  searchUsersArgs,
};
