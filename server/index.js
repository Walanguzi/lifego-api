const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const cors = require('cors');

const oauth = require('./oauth');
const schema = require('../server/schema');
const verifyToken = require('./lib/helpers/verifyToken');

module.exports = (app, server) => {
  app.use(cors());

  oauth(app);

  const socket = socketio(server, { pingTimeout: 30000 });

  app.use('/graphql', bodyParser.json(), verifyToken, (req, res, next) => graphqlExpress({
    schema,
    context: {
      socket,
      decoded: {
        id: 'dacssfv',
        displayName: 'oliver',
      },
    },
    formatError: ({ message, extensions }) => ({
      message,
      code: extensions ? extensions.code : 500,
    }),
  })(req, res, next));

  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphiql',
    passHeader: '\'token\': \'token-foo@bar.com\'',
  }));
};
