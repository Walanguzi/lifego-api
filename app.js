require('dotenv').config();
const express = require('express');
const http = require('http');

const app = express();

const server = http.Server(app);

require('./server')(app, server);

const port = process.env.PORT || 3002;

server.listen(port, () => {
  console.log(`Running on PORT: ${port}`); // eslint-disable-line no-console
});

module.exports = app;
