const {
  GraphQLNonNull,
  GraphQLString,
} = require('graphql');

const createBucketlistArgs = {
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
    type: GraphQLString,
  },
};

const updatBucketlistArgs = {
  ...createBucketlistArgs,
  name: {
    type: GraphQLString,
  },
  id: {
    type: new GraphQLNonNull(GraphQLString),
  },
};

const getBucketlistArgs = {
  id: {
    type: new GraphQLNonNull(GraphQLString),
  },
};

module.exports = {
  createBucketlistArgs,
  updatBucketlistArgs,
  getBucketlistArgs,
};
