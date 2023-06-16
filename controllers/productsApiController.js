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
      const { title, price, description, image, provider_name } = req.body;
      const providerId = await Provider.find({ company_name: RegExp(provider_name, 'i') })
      const product = {
        "title": title,
        "price": price,
        "description": description,
        "image": image,
        "provider": providerId[0]._id.toString()
      };
      await new Product(product).save();
      res.status(201).json( {
        message: "producto creado",
        product: product
      })
       
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
      if(new_data.provider) {
        const providerId = await Provider.find({ company_name: RegExp(new_data.provider, 'i') })
        await Product.findOneAndUpdate({ title: old_title}, { provider: providerId[0]._id.toString()});
        res.status(200).json({
          message: "producto Modificado con éxito",
          newData: new_data
        });
      }
      else {
        await Product.findOneAndUpdate({ title: old_title}, new_data);
        res.status(200).json({
          message: "producto Modificado con éxito",
          newData: new_data
        });
      }
    };
  }
  catch(error) {
    console.error(error);
    res.status(400).json({
      msj: `Error: ${error}`
    });
  };
};


// DELETE http://localhost:3000/api/products
async function deleteProduct(req, res) {
  try {
    if (req.body && typeof req.body === 'object' && req.body !== {}) {
      if (req.body.title) {
        const { title } = req.body;
        await Product.deleteOne({ title: RegExp(title, 'i') })
        res.status(200).json({
          message: `producto eliminado con éxito, title: ${title}`
        });
      }
      else if (req.body.provider) {
        const { provider } = req.body;
        const providerId = await Provider.find({ company_name: RegExp(provider, 'i') })
        const deleteProducts = await Product.deleteMany({ provider: providerId})
        res.status(200).json({
          message: `productos eliminados con éxito del proveedor ${provider}`
        });
      };
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
  updateProductByTitle,
  deleteProduct
}