const {
  GraphQLObjectType,
  GraphQLList,
} = require('graphql');
const { attributeFields } = require('graphql-sequelize');
const { notifications: Notification } = require('../../models');

const notification = new GraphQLObjectType({
  name: 'notification',
  fields: attributeFields(Notification),
});

const notifications = new GraphQLList(notification);

module.exports = {
  notification,
  notifications,
};
