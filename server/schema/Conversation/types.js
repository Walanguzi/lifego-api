const {
  GraphQLObjectType,
  GraphQLList,
} = require('graphql');
const { attributeFields } = require('graphql-sequelize');
const { conversations: Conversation } = require('../../models');
const message = require('../Message');

const attributes = attributeFields(Conversation);

const conversation = new GraphQLObjectType({
  name: 'conversation',
  fields: {
    ...attributes,
    messages: {
      type: new GraphQLList(message),
    },
  },
});

const conversations = new GraphQLList(conversation);

module.exports = {
  conversation,
  conversations,
};
