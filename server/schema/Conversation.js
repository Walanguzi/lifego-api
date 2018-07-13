const {
  GraphQLObjectType,
} = require('graphql');
const { attributeFields } = require('graphql-sequelize');
const { conversations } = require('../models');

module.exports = new GraphQLObjectType({
  name: 'conversations',
  description: 'A conversations',
  fields: attributeFields(conversations),
});
