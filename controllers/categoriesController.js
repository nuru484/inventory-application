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
  res.render('addCategoryForm', { title: 'Add Category Form' });
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

const categoryDetailGet = async (req, res) => {
  const categoryId = req.params.id;

  console.log(`id: ${categoryId}`);

  try {
    const category = await db.getCategoryById(categoryId);
    console.log(category);
    res.render('categoryDetails', { category: category });
  } catch (error) {
    console.error('Error fetching category details:', error);
    res.status(500).send('Server Error');
  }
};

const updateCategoryGet = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const category = await db.getCategoryById(id);
    res.render('updateCategoryForm', {
      title: 'Category Update Form',
      category: category,
    });
  } catch (error) {
    console.error('Error fetching product for update:', error);
    res.status(500).send('Internal Server Error');
  }
};

const updateCategoryPost = async (req, res) => {
  try {
    const { categoryId, categoryName } = req.body;

    await db.updateCategory(categoryId, categoryName);

    res.redirect(`/categories/${categoryId}`);
  } catch (error) {
    console.error('Error updating category', error);
    res.status(500).send('Internal Server Error');
  }
};

const deleteCategoryByIdGet = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).send('Invalid Category ID');
    }

    await db.deleteCategoryById(id);
    res.redirect('/');
  } catch (error) {
    console.error('Error Deleting Category', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  categoriesGet,
  addCategoryGet,
  addCategoryPost,
  categoryDetailGet,
  updateCategoryGet,
  updateCategoryPost,
  deleteCategoryByIdGet,
};
