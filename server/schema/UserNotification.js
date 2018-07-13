const {
  GraphQLObjectType,
} = require('graphql');
const { attributeFields } = require('graphql-sequelize');
const { userNotifications } = require('../models');

module.exports = new GraphQLObjectType({
  name: 'UserNotification',
  description: 'A user notification',
  fields: attributeFields(userNotifications),
});
