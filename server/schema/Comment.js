const {
  GraphQLObjectType,
} = require('graphql');
const { attributeFields } = require('graphql-sequelize');
const { comments } = require('../models');

module.exports = new GraphQLObjectType({
  name: 'Comment',
  description: 'A bucketlist comment',
  fields: attributeFields(comments),
});
