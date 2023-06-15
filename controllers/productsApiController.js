const Product = require('../models/products');
const Provider = require('../models/providers');

// GET http://localhost:3000/api/products
// GET http://localhost:3000/api/products?title=productTitle
async function getProducts(req, res)  {
  try {
    let products;
    if(req.query.title) {
      products = await Product
      .find({ title:  new RegExp(req.query.title, 'i')})
      .populate('provider', '-_id -__v')
      .select('-_id -__v');
    }
    else {
      products = await Product
      .find()
      .populate('provider', '-_id -__v')
      .select('-_id -__v');
    }
    res.status(200).json(products);
  }
  catch(error) {
    console.error(error);
    res.status(400).json({
      msj: `Error: ${error}`
    });
  };
};


// POST http://localhost:3000/api/products
async function createProduct(req, res) {
  try {
    if (req.body && typeof req.body === 'object' && req.body !== {} ) {
      const { title, price, description, image, provider_name } = req.body
      const providerId = await Provider.find({ company_name: RegExp(provider_name, 'i') })
      const product = {
        "title": title,
        "price": price,
        "description": description,
        "image": image,
        "provider": providerId[0]._id.toString()
      };
      await new Product(product).save();
      res.status(201).json({
        message: "producto creado",
        product: product
      });
    };
  }
  catch(error) {
    console.error(error);
    res.status(400).json({
      msj: `Error: ${error}`
    });
  };
};


// PUT http://localhost:3000/api/products
async function updateProductByTitle(req, res) {
  try {
    if (req.body && typeof req.body === 'object' && req.body !== {} ) {
      const { old_title, new_data } = req.body;
      await Product.findOneAndUpdate({ title: old_title}, new_data);
      res.status(200).json({
        message: "producto Modificado con éxito",
        newData: new_data
      });
    };
  }
  catch(error) {
    console.error(error);
    res.status(400).json({
      msj: `Error: ${error}`
    });
  };
};



module.exports = {
  getProducts,
  createProduct,
  updateProductByTitle
}