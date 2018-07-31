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
      endpointURL: '/api/graphql',
      passHeader: '\'token\': \'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJjamp3cGVqdmprOXAyeXZ5IiwidXNlcm5hbWUiOiJvbGl2ZXIubXVuYWxhQGFuZGVsYS5jb20iLCJlbWFpbCI6Im9saXZlci5tdW5hbGFAYW5kZWxhLmNvbSIsInBhc3N3b3JkIjoic2hhMSQ3Y2NiZWVkYiQxJDliYmIwMjE4NmJiZTI3MTYxOWY0YTAyZTg0ZWEzYjBmZDY0ZGQ2NjEiLCJkaXNwbGF5TmFtZSI6Ik9saXZlciBNdW5hbGEiLCJwaWN0dXJlVXJsIjpudWxsLCJzb2NpYWwiOmZhbHNlLCJyZW1pbmRlcnMiOnRydWUsInByaXZhY3kiOiJldmVyeW9uZSIsImNyZWF0ZWRBdCI6IjIwMTgtMDctMzFUMTI6NDQ6NDkuMDU0WiIsInVwZGF0ZWRBdCI6IjIwMTgtMDctMzFUMTI6NDQ6NDkuMDU0WiIsInVzZXJJZCI6bnVsbCwiaWF0IjoxNTMzMDQzOTg3LCJleHAiOjE1MzMxMzAzODd9.UNxUWytqmJmndMg9M3AHIoE1PdcWUJYeHGpFxuSgDWI\'',
    }));
  }

  return app;
};
