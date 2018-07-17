const {
  GraphQLSchema,
  GraphQLObjectType,
} = require('graphql');

const Bucketlist = require('./Bucketlist/type');
const bucketlistMutations = require('./Bucketlist/mutations');
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
      Bucketlist: { type: Bucketlist },
      Comment: { type: Comment },
      Conversation: { type: Conversation },
      Item: { type: Item },
      Like: { type: Like },
      Message: { type: Message },
      Notification: { type: Notification },
      User: { type: User },
      UserNotification: { type: UserNotification },
    }),
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutation',
    fields: () => ({
      ...bucketlistMutations,
    }),
  }),
});
