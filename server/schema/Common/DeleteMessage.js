const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'DeleteMessage',
  fields: () => ({
    message: {
      type: GraphQLString,
    },
  }),
});
