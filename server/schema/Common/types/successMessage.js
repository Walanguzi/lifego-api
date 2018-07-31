const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'successMessage',
  fields: () => ({
    message: {
      type: GraphQLString,
    },
  }),
});
