const {
  GraphQLObjectType,
} = require('graphql');
const { attributeFields } = require('graphql-sequelize');
const { notifications } = require('../models');

module.exports = new GraphQLObjectType({
  name: 'Notification',
  description: 'A bucketlist notification',
  fields: attributeFields(notifications),
});
