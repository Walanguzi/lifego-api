const {
  profile,
  searchUsers: users,
} = require('./types');
const {
  addFriendArgs,
  removeFriendArgs,
  getOtherProfileArgs,
  deleteAccountArgs,
  updateProfileArgs,
  searchUsersArgs,
} = require('./arguments');
const {
  getProfile,
  getOtherProfile,
  addFriend,
  removeFriend,
  updateProfile,
  deleteAccount,
  searchUsers,
} = require('../../lib/resolvers/users');
const { successMessage } = require('../Common/types');

module.exports = {
  getProfile: {
    type: profile,
    resolve: getProfile,
  },
  getOtherProfile: {
    type: profile,
    args: getOtherProfileArgs,
    resolve: getOtherProfile,
  },
  addFriend: {
    type: successMessage,
    args: addFriendArgs,
    resolve: addFriend,
  },
  removeFriend: {
    type: successMessage,
    args: removeFriendArgs,
    resolve: removeFriend,
  },
  updateProfile: {
    type: profile,
    args: updateProfileArgs,
    resolve: updateProfile,
  },
  deleteAccount: {
    type: successMessage,
    args: deleteAccountArgs,
    resolve: deleteAccount,
  },
  searchUsers: {
    type: users,
    args: searchUsersArgs,
    resolve: searchUsers,
  },
};
