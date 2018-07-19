const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
} = require('graphql');
const { attributeFields } = require('graphql-sequelize');
const { bucketlists: Bucketlist } = require('../../models');
const comment = require('../Comment');
const { item } = require('../Item/types');
const like = require('../Like');

const bucketlistFields = attributeFields(Bucketlist);

const bucketlist = new GraphQLObjectType({
  name: 'bucketlist',
  fields: {
    ...bucketlistFields,
    comments: {
      type: new GraphQLList(comment),
    },
    items: {
      type: new GraphQLList(item),
    },
    likes: {
      type: new GraphQLList(like),
    },
  },
});

const bucketlists = new GraphQLObjectType({
  name: 'bucketlists',
  fields: {
    bucketlists: {
      type: new GraphQLList(bucketlist),
    },
    nextOffset: {
      type: GraphQLInt,
    },
    prevOffset: {
      type: GraphQLInt,
    },
  },
});

module.exports = {
  bucketlist,
  bucketlists,
};
