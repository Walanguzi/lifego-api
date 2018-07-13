const {
  GraphQLObjectType,
} = require('graphql');
const { attributeFields } = require('graphql-sequelize');
const { likes } = require('../models');

module.exports = new GraphQLObjectType({
  name: 'Like',
  description: 'A bucketlist like',
  fields: attributeFields(likes),
});
