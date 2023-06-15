const express = require('express');
const providersApiController = require('../controllers/providersApiController');
const providersApiRoutes = express.Router();


providersApiRoutes.get('/', providersApiController.getProviders);

module.exports = providersApiRoutes;