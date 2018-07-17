const {
  GraphQLObjectType,
} = require('graphql');
const { attributeFields } = require('graphql-sequelize');
const { conversations } = require('../models');

module.exports = new GraphQLObjectType({
  name: 'Conversation',
  description: 'A conversations',
  fields: attributeFields(conversations),
});
