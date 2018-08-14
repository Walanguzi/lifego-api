const { GraphQLObjectType, GraphQLString } = require('graphql');
const { attributeFields } = require('graphql-sequelize');
const { messages } = require('../../models');

const attributes = attributeFields(messages);

const message = new GraphQLObjectType({
  name: 'message',
  fields: {
    ...attributes,
    receiverId: {
      type: GraphQLString,
    },
    user: {
      type: GraphQLString,
    },
    userPictureUrl: {
      type: GraphQLString,
    },
  },
});

module.exports = {
  message,
};
