const {
  GraphQLObjectType,
} = require('graphql');
const { attributeFields } = require('graphql-sequelize');
const { messages } = require('../models');

module.exports = new GraphQLObjectType({
  name: 'Message',
  description: 'A conversation message',
  fields: attributeFields(messages),
});
