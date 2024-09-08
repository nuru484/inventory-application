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

const addCategoryGet = (req, res) => {
  res.render('addCategory', { title: 'Add Category Form' });
};

const addCategoryPost = async (req, res) => {
  try {
    const { categoryName } = req.body;

    await db.addCategory(categoryName);

    res.redirect('/');
  } catch (error) {
    console.error('Error adding category', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { categoriesGet, addCategoryGet, addCategoryPost };
