const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');
const { attributeFields } = require('graphql-sequelize');
const { comments } = require('../../models');

const attributes = attributeFields(comments);
const comment = new GraphQLObjectType({
  name: 'comment',
  fields: {
    ...attributes,
    user: {
      type: GraphQLString,
    },
    userPictureUrl: {
      type: GraphQLString,
    },
  },
});

module.exports = {
  comment,
};
