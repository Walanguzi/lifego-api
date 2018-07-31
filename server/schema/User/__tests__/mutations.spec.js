const {
  profile,
  searchUsers: users,
} = require('../types');
const {
  addFriendArgs,
  removeFriendArgs,
  getOtherProfileArgs,
  deleteAccountArgs,
  updateProfileArgs,
  searchUsersArgs,
} = require('../arguments');
const userResolvers = require('../../../lib/resolvers/users');
const { successMessage } = require('../../Common/types');
const {
  getProfile,
  getOtherProfile,
  addFriend,
  removeFriend,
  updateProfile,
  deleteAccount,
  searchUsers,
} = require('../mutations');

describe('User mutation tests', () => {
  test('getProfile mutation', () => {
    expect(getProfile).toHaveProperty('type');
    expect(getProfile.type).toEqual(profile);

    expect(getProfile).toHaveProperty('resolve');
    expect(getProfile.resolve).toEqual(userResolvers.getProfile);
  });

  test('getOtherProfile mutation', () => {
    expect(getOtherProfile).toHaveProperty('type');
    expect(getOtherProfile.type).toEqual(profile);

    expect(getOtherProfile).toHaveProperty('args');
    expect(getOtherProfile.args).toEqual(getOtherProfileArgs);

    expect(getOtherProfile).toHaveProperty('resolve');
    expect(getOtherProfile.resolve).toEqual(userResolvers.getOtherProfile);
  });

  test('addFriend mutation', () => {
    expect(addFriend).toHaveProperty('type');
    expect(addFriend.type).toEqual(successMessage);

    expect(addFriend).toHaveProperty('args');
    expect(addFriend.args).toEqual(addFriendArgs);

    expect(addFriend).toHaveProperty('resolve');
    expect(addFriend.resolve).toEqual(userResolvers.addFriend);
  });

  test('removeFriend mutation', () => {
    expect(removeFriend).toHaveProperty('type');
    expect(removeFriend.type).toEqual(successMessage);

    expect(removeFriend).toHaveProperty('args');
    expect(removeFriend.args).toEqual(removeFriendArgs);

    expect(removeFriend).toHaveProperty('resolve');
    expect(removeFriend.resolve).toEqual(userResolvers.removeFriend);
  });

  test('deleteAccount mutation', () => {
    expect(deleteAccount).toHaveProperty('type');
    expect(deleteAccount.type).toEqual(successMessage);

    expect(deleteAccount).toHaveProperty('args');
    expect(deleteAccount.args).toEqual(deleteAccountArgs);

    expect(deleteAccount).toHaveProperty('resolve');
    expect(deleteAccount.resolve).toEqual(userResolvers.deleteAccount);
  });

  test('updateProfile mutation', () => {
    expect(updateProfile).toHaveProperty('type');
    expect(updateProfile.type).toEqual(profile);

    expect(updateProfile).toHaveProperty('args');
    expect(updateProfile.args).toEqual(updateProfileArgs);

    expect(updateProfile).toHaveProperty('resolve');
    expect(updateProfile.resolve).toEqual(userResolvers.updateProfile);
  });

  test('searchUsers mutation', () => {
    expect(searchUsers).toHaveProperty('type');
    expect(searchUsers.type).toEqual(users);

    expect(searchUsers).toHaveProperty('args');
    expect(searchUsers.args).toEqual(searchUsersArgs);

    expect(searchUsers).toHaveProperty('resolve');
    expect(searchUsers.resolve).toEqual(userResolvers.searchUsers);
  });
});
