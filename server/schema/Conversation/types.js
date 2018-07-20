const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
} = require('graphql');
const { attributeFields } = require('graphql-sequelize');
const { conversations: Conversation } = require('../../models');
const { message } = require('../Message/types');

const attributes = attributeFields(Conversation);

const conversation = new GraphQLObjectType({
  name: 'conversation',
  fields: {
    ...attributes,
    messages: {
      type: new GraphQLList(message),
    },
    senderPictureUrl: {
      type: GraphQLString,
    },
    senderDisplayName: {
      type: GraphQLString,
    },
    receiverPictureUrl: {
      type: GraphQLString,
    },
    receiverDisplayName: {
      type: GraphQLString,
    },
  },
});

const conversations = new GraphQLList(conversation);

module.exports = {
  conversation,
  conversations,
};
