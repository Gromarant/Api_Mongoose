const express = require('express');
const providersApiController = require('../controllers/providersApiController');
const providersApiRoutes = express.Router();


providersApiRoutes.get('/', providersApiController.getProviders);
providersApiRoutes.post('/', providersApiController.createProvider);
providersApiRoutes.put('/', providersApiController.updateProviderByName);
providersApiRoutes.delete('/', providersApiController.deleteProvider);

module.exports = providersApiRoutes;