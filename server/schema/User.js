const {
  GraphQLObjectType,
} = require('graphql');
const { attributeFields } = require('graphql-sequelize');
const { users } = require('../models');

module.exports = new GraphQLObjectType({
  name: 'User',
  description: 'A user',
  fields: attributeFields(users),
});
