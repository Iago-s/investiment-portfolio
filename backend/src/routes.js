const express = require('express');
const routes = express.Router();

routes.get('/', (request, response) => {
  response.send('<h1>Welcome investiment portfolios</h1>');
});

module.exports = routes;