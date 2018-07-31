const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const cors = require('cors');

const authRoute = require('./routes/authRoutes');
const oauth = require('./oauth');
const schema = require('../server/schema');
const verifyToken = require('./lib/middleware/verifyToken');

module.exports = (app, server) => {
  app.use(cors());

  oauth(app);

  const socket = socketio(server, { pingTimeout: 30000 });

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use('/api/auth', authRoute());

  app.use('/api/graphql', bodyParser.json(), verifyToken, (req, res, next) => graphqlExpress({
    schema,
    context: {
      socket,
      decoded: req.decoded,
    },
    formatError: ({ message, extensions }) => ({
      message,
      code: extensions ? extensions.code : 500,
    }),
  })(req, res, next));

  if (process.env.NODE_ENV === 'development') {
    app.use('/api/graphiql', graphiqlExpress({
      endpointURL: '/api/graphiql',
      passHeader: '\'token\': \'token-foo@bar.com\'',
    }));
  }

  return app;
};
