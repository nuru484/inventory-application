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

const updateSupplierGet = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(id);
    const supplier = await db.getSupplierById(id);
    res.render('updateSupplierForm', {
      title: 'Supplier Update Form',
      supplier: supplier,
    });
  } catch (error) {
    console.error('Error fetching supplier for update:', error);
    res.status(500).send('Internal Server Error');
  }
};

const updateSupplierPost = async (req, res) => {
  try {
    const { supplierId, supplierName, contactInfo } = req.body;

    await db.updateSupplier(supplierId, supplierName, contactInfo);

    res.redirect(`/suppliers/${supplierId}`);
  } catch (error) {
    console.error('Error updating supplier', error);
    res.status(500).send('Internal Server Error');
  }
};

const deleteSupplierByIdGet = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).send('Invalid Supplier ID');
    }

    await db.deleteSupplierById(id);
    res.redirect('/');
  } catch (error) {
    console.error('Error Deleting Supplier', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  suppliersGet,
  addSupplierGet,
  addSupplierPost,
  supplierDetailGet,
  updateSupplierGet,
  updateSupplierPost,
  deleteSupplierByIdGet,
};
