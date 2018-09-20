require('express-async-errors');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const bodyParser = require('body-parser');

const authRoute = require('../routes/authRoutes');
const schema = require('../schema');
const verifyToken = require('../lib/middleware/verifyToken');
const logResponse = require('../lib/middleware/logResponse');
const { formatError } = require('../lib/utils/miscellaneousUtils');

module.exports = (app) => {
  app.get('/monitor', (req, res) => {
    res.send('App is running');
  });

  app.use('/api/auth', authRoute());

  app.use('/api/graphql', logResponse);

  app.use('/api/graphql', bodyParser.json(), verifyToken, (req, res, next) => graphqlExpress({
    schema,
    context: {
      socket: app.get('socket'),
      logger: app.get('logger'),
      publishData: app.get('publishData'),
      decoded: req.decoded,
    },
    formatError: formatError({ app, req }),
  })(req, res, next));

  if (process.env.NODE_ENV === 'development') {
    app.use('/api/graphiql', graphiqlExpress({
      endpointURL: '/api/graphql',
      passHeader: '\'token\': \'<login and place token here>\'',
    }));
  }
};
