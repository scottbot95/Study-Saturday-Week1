// Require Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const router = require('./routes');
const models = require('./models');

// Init App
const app = express();

// Basic Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// routing middleware
app.use(router);

// 404 Handler
app.use((req, res) => {
  res.status(404).send('The page you requested does not exist');
});

// Error handler
app.use((err, req, res, next) => {
  res.status(500).json(err);
});

// Listen on server

(async () => {
  const err = await models.init();
  if (err) {
    throw err;
  }

  app.listen(3000, () => {
    console.log('Server is listening on port 3000!');
  });
})();
