const { GraphQLObjectType } = require('graphql');
const { attributeFields } = require('graphql-sequelize');
const { messages } = require('../../models');

const message = new GraphQLObjectType({
  name: 'message',
  fields: attributeFields(messages),
});

module.exports = {
  message,
};
