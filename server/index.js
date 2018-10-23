require('express-async-errors');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const setupTools = require('./startup');

module.exports = async (app, server) => {
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  await setupTools({ app, server }); // setup required tools

  routes(app); // setup routes

  return app;
};
