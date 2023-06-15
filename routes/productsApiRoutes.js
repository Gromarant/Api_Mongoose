const express = require('express');
const productsApiController = require('../controllers/productsApiController');
const productsApiRoutes = express.Router();


productsApiRoutes.get('/', productsApiController.getProducts);
productsApiRoutes.post('/', productsApiController.createProduct);
productsApiRoutes.put('/', productsApiController.updateProductByTitle);
productsApiRoutes.delete('/', productsApiController.deleteProduct);

module.exports = productsApiRoutes;