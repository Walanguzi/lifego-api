const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const socketio = require('socket.io');
const http = require('http');
const models = require('./server/models');
const graphql = require('./server');
const oauth = require('./server/oauth');

const app = express();
const server = http.Server(app);
const websocket = socketio(server, { pingTimeout: 30000 });
const port = process.env.PORT || 3001;

app.use(cors());
app.set('models', models);

app.set('socket', websocket);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

oauth(app);
graphql(app);

server.listen(port, () => {
  console.log(`Running on PORT: ${port}`); // eslint-disable-line no-console
});

module.exports = app;
