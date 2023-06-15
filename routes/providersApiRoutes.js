const express = require('express');
const providersApiController = require('../controllers/providersApiController');
const providersApiRoutes = express.Router();


providersApiRoutes.get('/', providersApiController.getProviders);
providersApiRoutes.post('/', providersApiController.createProviders);

module.exports = providersApiRoutes;