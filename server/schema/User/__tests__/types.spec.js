const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} = require('graphql');
const {
  user,
  profile,
  searchUsers,
} = require('../types');

describe('User type tests', () => {
  test('Should have all model fields', () => {
    expect(profile.getFields()).toHaveProperty('id');
    expect(profile.getFields()).toHaveProperty('displayName');
    expect(profile.getFields()).toHaveProperty('email');
    expect(profile.getFields()).toHaveProperty('password');
    expect(profile.getFields()).toHaveProperty('pictureUrl');
    expect(profile.getFields()).toHaveProperty('privacy');
    expect(profile.getFields()).toHaveProperty('social');
    expect(profile.getFields()).toHaveProperty('reminders');
  });

  test('Should have correct field types', () => {
    expect(profile.getFields().id.type)
      .toEqual(new GraphQLNonNull(GraphQLString));
    expect(profile.getFields().displayName.type)
      .toEqual(new GraphQLNonNull(GraphQLString));
    expect(profile.getFields().email.type)
      .toEqual(new GraphQLNonNull(GraphQLString));
    expect(profile.getFields().password.type)
      .toEqual(new GraphQLNonNull(GraphQLString));
    expect(profile.getFields().pictureUrl.type)
      .toEqual(GraphQLString);
    expect(profile.getFields().privacy.type)
      .toEqual(new GraphQLNonNull(GraphQLString));
    expect(profile.getFields().social.type)
      .toEqual(GraphQLBoolean);
    expect(profile.getFields().reminders.type)
      .toEqual(GraphQLBoolean);
  });
});

describe('Users type tests', () => {
  test('Should have all return fields', () => {
    expect(searchUsers).toEqual(new GraphQLList(user));
  });
});
