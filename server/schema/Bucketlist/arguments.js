const {
  GraphQLNonNull,
  GraphQLString,
} = require('graphql');

module.exports = {
  createBucketlistArgs: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: GraphQLString,
    },
    location: {
      type: GraphQLString,
    },
    category: {
      type: GraphQLString,
    },
    dueDate: {
      type: GraphQLString,
    },
    privacy: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
};
