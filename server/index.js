require('express-async-errors');
const bodyParser = require('body-parser');
const cors = require('cors');
const setupRoutes = require('./routes');
const setupTools = require('./startup');

module.exports = async (app, server) => {
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  await setupTools({ app, server }); // setup required tools

  setupRoutes(app); // setup routes

  return app;
};
