const express = require('express');
const routes = express.Router();

const UserController = require('./controllers/UserController');
const ActiveController = require('./controllers/ActiveController');

routes.get('/', (request, response) => {
  response.send('<h1>Welcome investiment portfolios</h1>');
});
routes.post('/', UserController.login);

routes.post('/cadastrar', UserController.register);

routes.get('/actives/:user_id', ActiveController.listActives);
routes.post('/addActive/:user_id', ActiveController.addActive);
routes.post('/carteira', ActiveController.getPriceActive);
routes.post('/atualizar-ativo', ActiveController.updateActive);
routes.delete('/apagar-ativo/:active_id', ActiveController.deleteActive);

module.exports = routes;