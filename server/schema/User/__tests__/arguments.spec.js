const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
} = require('graphql');

const {
  addFriendArgs,
  removeFriendArgs,
  getOtherProfileArgs,
  deleteAccountArgs,
  updateProfileArgs,
  searchUsersArgs,
} = require('../arguments');

describe('User arguments tests', () => {
  test('addFriendArgs types', () => {
    expect(addFriendArgs).toHaveProperty('id');
    expect(addFriendArgs.id.type).toEqual(new GraphQLNonNull(GraphQLString));
  });

  test('removeFriendArgs types', () => {
    expect(removeFriendArgs).toHaveProperty('id');
    expect(removeFriendArgs.id.type).toEqual(new GraphQLNonNull(GraphQLString));
  });

  test('getOtherProfileArgs types', () => {
    expect(getOtherProfileArgs).toHaveProperty('id');
    expect(getOtherProfileArgs.id.type).toEqual(new GraphQLNonNull(GraphQLString));
  });

  test('searchUsersArgs types', () => {
    expect(searchUsersArgs).toHaveProperty('name');
    expect(searchUsersArgs.name.type).toEqual(new GraphQLNonNull(GraphQLString));
  });

  test('deleteAccountArgs types', () => {
    expect(deleteAccountArgs).toHaveProperty('email');
    expect(deleteAccountArgs.email.type).toEqual(new GraphQLNonNull(GraphQLString));

    expect(deleteAccountArgs).toHaveProperty('password');
    expect(deleteAccountArgs.password.type).toEqual(new GraphQLNonNull(GraphQLString));
  });

  test('updateProfileArgs types', () => {
    expect(updateProfileArgs).toHaveProperty('displayName');
    expect(updateProfileArgs.displayName.type).toEqual(GraphQLString);

    expect(updateProfileArgs).toHaveProperty('pictureUrl');
    expect(updateProfileArgs.pictureUrl.type).toEqual(GraphQLString);

    expect(updateProfileArgs).toHaveProperty('privacy');
    expect(updateProfileArgs.privacy.type).toEqual(GraphQLString);

    expect(updateProfileArgs).toHaveProperty('reminders');
    expect(updateProfileArgs.reminders.type).toEqual(GraphQLBoolean);
  });
});
