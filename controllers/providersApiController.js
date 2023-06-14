const Provider = require('./models/providers');
require('../utils/db_mongo');

// Crear publisher/compañía
// async function createProvider(company_name, CIF, address, url_web) {
//   const provider = new Provider({
//     company_name,
//     CIF,
//     address,
//     url_web
//   });

//   const result = await provider.save();
//   console.log(result);
// }

// module.exports = {
//   createProvider
// }