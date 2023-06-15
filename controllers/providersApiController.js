const Provider = require('../models/providers');

// GET http://localhost:3000/api/providers
// GET http://localhost:3000/api/providers?company_name=providerName
async function getProviders(req, res)  {
  try {
    let providers;
    if(req.query.company_name) {
      providers = await Provider
      .find({ company_name:  new RegExp(req.query.company_name, 'i')})
      .select('-_id -__v');
    }
    else {
      providers = await Provider
      .find()
      .select('-_id -__v');
    }
    res.status(200).json(providers);
  }
  catch(error) {
    console.error(error);
    res.status(400).json({
      msj: `Error: ${error}`
    });
  };
}

module.exports = {
  getProviders
}