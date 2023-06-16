require('dotenv').config();
const mongoose = require("mongoose");
const express = require('express');
require('./utils/db_mongo');
const app = express();
const port = 3000;

//Modelos
const Provider = require('./models/providers');
const Product = require('./models/products');

//Rutas
const productsRoutes = require('./routes/productsApiRoutes');
const providersRoutes = require('./routes/providersApiRoutes');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Prefijos
app.get('/', (req, res) => {
  res.send(`<a href="https://github.com/Gromarant/Api_Mongoose/blob/main/README.md">Bienvenid@!!, en este link podrás ver la documentación</a>`);
});

app.use('/api/products', productsRoutes);
app.use('/api/providers', providersRoutes);


app.listen(port, () => console.log(`listening on port http://localhost:${port}`));