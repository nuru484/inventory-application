const db = require('../db/queries');

const homepage = async (req, res) => {
  try {
    const products = await db.getAllProducts();
    res.render('index', { title: 'Dashboard', products: products });
  } catch (error) {
    console.error(`Internal server error: ${error.stack}`);
    throw error;
  }
};

module.exports = { homepage };
