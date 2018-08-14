const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
} = require('graphql');
const { attributeFields } = require('graphql-sequelize');
const { notifications: Notification } = require('../../models');

const attributes = attributeFields(Notification);

const notification = new GraphQLObjectType({
  name: 'notification',
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

const notifications = new GraphQLList(notification);

module.exports = {
  notification,
  notifications,
};
