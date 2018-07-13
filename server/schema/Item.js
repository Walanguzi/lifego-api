const {
  GraphQLObjectType,
} = require('graphql');
const { attributeFields } = require('graphql-sequelize');
const { items } = require('../models');

module.exports = new GraphQLObjectType({
  name: 'Item',
  description: 'A bucketlist item',
  fields: attributeFields(items),
});
