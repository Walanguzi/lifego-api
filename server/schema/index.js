const {
  GraphQLSchema,
  GraphQLObjectType,
} = require('graphql');

const { bucketlist } = require('./Bucketlist/types');
const { item } = require('./Item/types');
const { comment } = require('./Comment/types');
const bucketlistMutations = require('./Bucketlist/mutations');
const itemMutations = require('./Item/mutations');
const commentMutations = require('./Comment/mutations');
const Conversation = require('./Conversation');
const Like = require('./Like');
const Message = require('./Message');
const Notification = require('./Notification');
const User = require('./User');
const UserNotification = require('./UserNotification');

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
      Bucketlist: { type: bucketlist },
      Comment: { type: comment },
      Conversation: { type: Conversation },
      Item: { type: item },
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
      ...itemMutations,
      ...commentMutations,
    }),
  }),
});
