const mongoose = require("mongoose");
const express = require('express');
require('./utils/db_mongo');
const app = express();
const port = 3000;

//Modelos
const Provider = require('./models/providers');
const Product = require('./models/products');

//Rutas
const productsApiRoutes = require('./routes/productsApiRoutes');
const providersApiRoutes = require('./routes/providersApiRoutes');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Prefijos
app.get('/', (req, res) => {
  res.send(`<h1>Bienvenid@!!</h1>`);
});

app.use('/api/products', productsApiRoutes);
// app.use('/api/providers', providersApiRoutes);

// // Crear publisher/compañía
// async function createProvider(req, rest) {
//   try {

//   }
//   catch(error) {
//     console.error(error);

//   }
//   const provider = new Provider({
//     company_name,
//     CIF,
//     address,
//     url_web
//   });

//   const result = await provider.save();
//   console.log(result);
// }

// async function createGame2(title, companyName) {

//   const publisher = await Publisher.find({companyName});
//   const publisher_id = publisher[0]._id.toString();    

//   const game = new Game({
//       title,
//       publisher:publisher_id
//   });

//   const result = await game.save();
//   console.log(result);
// }

app.listen(port, () => console.log(`listening on port http://localhost:${port}`));