const { GraphQLObjectType } = require('graphql');
const { attributeFields } = require('graphql-sequelize');
const { comments } = require('../../models');

const comment = new GraphQLObjectType({
  name: 'comment',
  fields: attributeFields(comments),
});

module.exports = {
  comment,
};
