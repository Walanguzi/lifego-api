const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'SuccessMessage',
  fields: () => ({
    message: {
      type: GraphQLString,
    },
  }),
});
