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
};

// POST http://localhost:3000/api/providers
async function createProvider(req, res) {
  try {
    if (req.body && typeof req.body === 'object' && req.body !== {} ) {
      const { company_name, CIF, address, url_web } = req.body;
      const provider = {
        "company_name": company_name,
        "CIF": CIF,
        "address": address,
        "url_web": url_web,
      }
      await new Provider(provider).save();
      res.status(201).json({
        message: "provider creado con éxito",
        provider: provider
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

// PUT http://localhost:3000/api/providers
async function updateProviderByName(req, res) {
  try {
    if (req.body && typeof req.body === 'object' && req.body !== {} ) {
      const { old_companyName, new_companyData } = req.body;
      await Provider.findOneAndUpdate({ company_name: old_companyName}, new_companyData);
      res.status(200).json({
        message: "provider Modificado con éxito",
        newDataProvider: new_companyData
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
  getProviders,
  createProvider,
  updateProviderByName
}