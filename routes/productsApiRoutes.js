const express = require('express');
const productsApiController = require('../controllers/productsApiController');
const productsApiRoutes = express.Router();


// productsApiRoutes.get('/', productsApiController.getProducts);
// [GET] http://localhost:3000/api/products Retorna un objeto con los datos de todos los productos. Retorna un status 200. Usar populate() para que traiga los datos del proveedor de cada producto.
productsApiRoutes.get('/', productsApiController.getProducts);
productsApiRoutes.post('/', productsApiController.createProduct);
productsApiRoutes.put('/', productsApiController.updateProductByTitle);
productsApiRoutes.delete('/', productsApiController.deleteProduct);

module.exports = productsApiRoutes;