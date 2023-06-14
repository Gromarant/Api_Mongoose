const Product = require('../models/products');

// GET http://localhost:3000/
// GET http://localhost:3000/
async function getProducts(req, res)  {
  try {
    let products;
    if(req.query.title) {
      products = await Product
        .find({ title:  new RegExp(req.query.title, 'i')})
        .exec();
    }
    else {
      products = await Product.find();
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


module.exports = {
  getProducts
}