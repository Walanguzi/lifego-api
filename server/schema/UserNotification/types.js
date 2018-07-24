const {
  GraphQLObjectType,
  GraphQLList,
} = require('graphql');
const { attributeFields } = require('graphql-sequelize');
const { userNotifications: Notification } = require('../../models');

const userNotification = new GraphQLObjectType({
  name: 'userNotification',
  fields: attributeFields(Notification),
});

const userNotifications = new GraphQLList(userNotification);

module.exports = {
  userNotification,
  userNotifications,
};
