const db = require('../db/queries');

const homepage = async (req, res) => {
  try {
    const products = await db.getAllProducts();
    const categories = await db.getAllCategories();
    const suppliers = await db.getAllSuppliers();

    res.render('index', {
      title: 'Dashboard',
      products: products,
      categories: categories,
      suppliers: suppliers,
    });
  } catch (error) {
    console.error(`Internal server error: ${error.stack}`);
    throw error;
  }
};

module.exports = { homepage };
