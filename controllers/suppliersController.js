const db = require('../db/queries');

const suppliersGet = async (req, res) => {
  try {
    const suppliers = await db.getAllSuppliers();
    res.json({
      suppliers: suppliers,
    });
  } catch (error) {
    console.error(`Error fetching suppliers: ${error.stack}`);
    res.status(500).send('Internal Server Error');
  }
};

const addSupplierGet = (req, res) => {
  res.render('addSupplierForm', { title: 'Add Supplier Form' });
};

const addSupplierPost = async (req, res) => {
  try {
    const { supplierName, contactInfo } = req.body;

    await db.addSupplier(supplierName, contactInfo);

    res.redirect('/');
  } catch (error) {
    console.error('Error adding supplier', error);
    res.status(500).send('Internal Server Error');
  }
};

const supplierDetailGet = async (req, res) => {
  const supplierId = req.params.id;

  try {
    const supplier = await db.getSupplierById(supplierId);
    res.render('supplierDetails', { supplier: supplier });
  } catch (error) {
    console.error('Error fetching supplier details:', error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  suppliersGet,
  addSupplierGet,
  addSupplierPost,
  supplierDetailGet,
};
