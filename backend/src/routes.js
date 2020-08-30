const express = require('express');
const routes = express.Router();

const UserController = require('./controllers/UserController');

routes.get('/', (request, response) => {
  response.send('<h1>Welcome investiment portfolios</h1>');
});
routes.post('/', UserController.login);

routes.post('/cadastrar', UserController.register);


routes.delete('/:id', UserController.delete);

module.exports = routes;