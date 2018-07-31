const {
  GraphQLObjectType,
  GraphQLList,
} = require('graphql');
const { attributeFields } = require('graphql-sequelize');
const { users } = require('../../models');

const userFields = attributeFields(users);

const user = new GraphQLObjectType({
  name: 'user',
  fields: userFields,
});

const profile = new GraphQLObjectType({
  name: 'users',
  fields: {
    ...userFields,
    friends: {
      type: new GraphQLList(user),
    },
    followers: {
      type: new GraphQLList(user),
    },
  },
});

const searchUsers = new GraphQLList(user);

module.exports = {
  user,
  profile,
  searchUsers,
};
