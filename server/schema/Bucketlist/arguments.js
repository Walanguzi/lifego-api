const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
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

const getBucketlistArgs = {
  id: {
    type: new GraphQLNonNull(GraphQLString),
  },
};

const listArgs = {
  offset: {
    type: GraphQLInt,
  },
  limit: {
    type: GraphQLInt,
  },
  name: {
    type: GraphQLString,
  },
};

const updateBucketlistArgs = {
  ...createBucketlistArgs,
  ...getBucketlistArgs,
};

const deleteBucketlistArgs = getBucketlistArgs;

module.exports = {
  createBucketlistArgs,
  updateBucketlistArgs,
  getBucketlistArgs,
  deleteBucketlistArgs,
  listArgs,
};
