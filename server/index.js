const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const cors = require('cors');

const authRoute = require('./routes/authRoutes');
const oauth = require('./oauth');
const rabbit = require('./rabbitMQ');
const winston = require('./winston');
const schema = require('../server/schema');
const verifyToken = require('./lib/middleware/verifyToken');
const logResponse = require('./lib/middleware/logResponse');
const graphQLLogger = require('./lib/middleware/graphQLLogger');

module.exports = (app, server) => {
  app.use(cors());

  oauth(app);

  const socket = socketio(server, { pingTimeout: 30000 });

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(logResponse);
  app.use('/api/auth', authRoute());

  const logger = winston();

  app.set('logger', logger);

  app.use(graphQLLogger);

  rabbit((publishData) => {
    app.use('/api/graphql', logResponse);

    app.use('/api/graphql', bodyParser.json(), verifyToken, (req, res, next) => graphqlExpress({
      schema,
      context: {
        socket,
        logger,
        publishData,
        decoded: req.decoded,
      },
      formatError: ({ message, extensions }) => {
        const errorResponse = {
          message,
          code: extensions ? extensions.code : 500,
        };

        logger.error(JSON.stringify({
          ...errorResponse,
          request: {
            headers: req.rawHeaders.filter((header, i) => {
              if (['token', 'Token'].includes(header) || ['token', 'Token'].includes(i > 0 && req.rawHeaders[i - 1] === 'token')) {
                return false;
              }
              return true;
            }),
            body: req.body,
          },
        }));

        return errorResponse;
      },
    })(req, res, next));

    if (process.env.NODE_ENV === 'development') {
      app.use('/api/graphiql', graphiqlExpress({
        endpointURL: '/api/graphql',
        passHeader: '\'token\': \'<login and place token here>\'',
      }));
    }
  });


  return app;
};
