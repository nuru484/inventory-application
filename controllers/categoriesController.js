const db = require('../db/queries');

const categoriesGet = async (req, res) => {
  try {
    const categories = await db.getAllCategories();
    res.render('categories', {
      title: 'Product Categories',
      categories: categories,
    });
  } catch (error) {
    console.error(`Error fetching categories: ${error.stack}`);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { categoriesGet };
