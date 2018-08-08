const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
} = require('graphql');
const { attributeFields } = require('graphql-sequelize');
const { bucketlists: Bucketlist } = require('../../models');
const { item } = require('../Item/types');
const { comment } = require('../Comment/types');
const { like } = require('../Like/types');

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
    user: {
      type: GraphQLString,
    },
    userPictureUrl: {
      type: GraphQLString,
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
