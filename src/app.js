const express = require('express');
const productsControllers = require('./controllers/products.controllers');
const salesControllers = require('./controllers/sales.controllers');

const validateNewSale = require('./middlewares/validateNewSale');
const validateNameProduct = require('./middlewares/validateNameProduct');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products/search', productsControllers.searchProduct);

app.get('/products', productsControllers.listProducts);

app.get('/products/:id', productsControllers.getProducts);

app.post('/products', validateNameProduct, productsControllers.create);

app.put('/products/:id', validateNameProduct, productsControllers.update);

app.delete('/products/:id', productsControllers.deleteProduct);

app.post('/sales', validateNewSale, salesControllers.create);

app.get('/sales', salesControllers.findAll);

app.get('/sales/:id', salesControllers.findById);

app.delete('/sales/:id', salesControllers.deleteSale);

app.put('/sales/:id', validateNewSale, salesControllers.update);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;