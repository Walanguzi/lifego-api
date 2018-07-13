const {
  GraphQLObjectType,
} = require('graphql');
const { attributeFields } = require('graphql-sequelize');
const { bucketlists } = require('../../models');

module.exports = new GraphQLObjectType({
  name: 'Bucketlist',
  fields: attributeFields(bucketlists),
});
