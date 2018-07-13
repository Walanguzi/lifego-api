const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const schema = require('../server/schema');

module.exports = (app) => {
  app.use('/graphql', graphqlExpress({
    schema,
    context: {

    },
    formatError: error => ({
      message: error.message,
      code: error.statusCode,
    }),
    graphiql: true,
  }));
  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
    passHeader: '\'Authorization\': \'bearer token-foo@bar.com\'',
  }));
};
