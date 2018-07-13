const {
  GraphQLSchema,
  GraphQLObjectType,
} = require('graphql');

const Bucketlist = require('./Bucketlist/type');
const Comment = require('./Comment');
const Conversation = require('./Conversation');
const Item = require('./Item');
const Like = require('./Like');
const Message = require('./Message');
const Notification = require('./Notification');
const User = require('./User');
const UserNotification = require('./UserNotification');

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
      Bucketlist,
      comment: { type: Comment },
      conversation: { type: Conversation },
      item: { type: Item },
      like: { type: Like },
      message: { type: Message },
      notification: { type: Notification },
      user: { type: User },
      userNotification: { type: UserNotification },
    }),
  }),
});
