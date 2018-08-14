const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
} = require('graphql');
const { attributeFields } = require('graphql-sequelize');
const { userNotifications: Notification } = require('../../models');

const attributes = attributeFields(Notification);

const userNotification = new GraphQLObjectType({
  name: 'userNotification',
  fields: {
    ...attributes,
    user: {
      type: GraphQLString,
    },
    userPictureUrl: {
      type: GraphQLString,
    },
  },
});

const userNotifications = new GraphQLList(userNotification);

module.exports = {
  userNotification,
  userNotifications,
};
