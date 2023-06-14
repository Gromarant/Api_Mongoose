const mongoose = require('mongoose');
require('../utils/db_mongo'); //dataBase conection

const objectSchema = {
  title: { 
      type: String, 
      required: true,
      unique: true 
  },
  price: { 
      type: Number, 
      required: true 
  },
  description: { 
      type: String, 
      required: true 
  },
  image:{
      type: String,
      required: true
  },
  provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Provider'
  }
};
// Crear el esquema
const productSchema = mongoose.Schema(objectSchema);
// Crear el modelo --> Colección
const Product = mongoose.model('Product', productSchema);

module.exports = Product;