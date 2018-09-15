const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const cors = require('cors');

const authRoute = require('./routes/authRoutes');
const oauth = require('./oauth');
const rabbit = require('./rabbitMQ');
const schema = require('../server/schema');
const verifyToken = require('./lib/middleware/verifyToken');

module.exports = (app, server) => {
  rabbit((publishData) => {
    app.use(cors());

    oauth(app);

    const socket = socketio(server, { pingTimeout: 30000 });

    app.use('/api/auth', authRoute());

    app.use('/api/graphql', bodyParser.json(), verifyToken, (req, res, next) => graphqlExpress({
      schema,
      context: {
        socket,
        publishData,
        decoded: req.decoded,
      },
      formatError: ({ message, extensions }) => ({
        message,
        code: extensions ? extensions.code : 500,
      }),
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
