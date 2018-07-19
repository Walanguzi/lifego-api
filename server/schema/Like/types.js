const { GraphQLObjectType } = require('graphql');
const { attributeFields } = require('graphql-sequelize');
const { likes } = require('../../models');

const like = new GraphQLObjectType({
  name: 'like',
  fields: attributeFields(likes),
});

module.exports = {
  like,
};
