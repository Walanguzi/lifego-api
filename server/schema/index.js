const {
  GraphQLSchema,
  GraphQLObjectType,
} = require('graphql');

const { bucketlist } = require('./Bucketlist/types');
const { item } = require('./Item/types');
const { comment } = require('./Comment/types');
const { like } = require('./Like/types');
const { conversation } = require('./Conversation/types');
const { message } = require('./Message/types');
const { notification } = require('./Notification/types');
const { profile } = require('./User/types');
const bucketlistMutations = require('./Bucketlist/mutations');
const itemMutations = require('./Item/mutations');
const commentMutations = require('./Comment/mutations');
const conversationMutations = require('./Conversation/mutations');
const likeMutations = require('./Like/mutations');
const messageMutations = require('./Message/mutations');
const notificationMutations = require('./Notification/mutations');
const userMutations = require('./User/mutations');
const UserNotification = require('./UserNotification');

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
      Bucketlist: { type: bucketlist },
      Comment: { type: comment },
      Like: { type: like },
      Conversation: { type: conversation },
      Item: { type: item },
      Message: { type: message },
      Notification: { type: notification },
      User: { type: profile },
      UserNotification: { type: UserNotification },
    }),
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutation',
    fields: () => ({
      ...bucketlistMutations,
      ...itemMutations,
      ...commentMutations,
      ...likeMutations,
      ...conversationMutations,
      ...messageMutations,
      ...notificationMutations,
      ...userMutations,
    }),
  }),
});
