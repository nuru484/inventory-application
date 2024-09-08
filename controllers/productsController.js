const db = require('../db/queries');

const addProductGet = (req, res) => {
  res.render('productForm', { title: 'Product Form' });
};

const addProductPost = async (req, res) => {
  try {
    const { name, description, price, quantity, categoryId, supplierId } =
      req.body;

    await db.addProduct(
      name,
      description,
      price,
      quantity,
      categoryId,
      supplierId
    );

    res.redirect('/');
  } catch (error) {
    console.error('Error fetching products', error);
    res.status(500).send('Internal Server Error');
  }
};

const updateProductGet = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await db.getProductById(id);
    res.render('updateProductForm', {
      title: 'Product Update Form',
      product: product,
    });
  } catch (error) {
    console.error('Error fetching product for update:', error);
    res.status(500).send('Internal Server Error');
  }
};

const updateProductsPost = async (req, res) => {
  try {
    const { name, description, price, quantity, categoryId, supplierId } =
      req.body;

    await db.updateProduct(
      name,
      description,
      price,
      quantity,
      categoryId,
      supplierId
    );

    res.redirect('/');
  } catch (error) {
    console.error('Error updating product', error);
    res.status(500).send('Internal Server Error');
  }
};

const deleteProductByIdPost = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).send('Invalid product ID');
    }

    await db.deleteProductById(id);
    res.redirect('/');
  } catch (error) {
    console.error('Error Deleting Product', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  addProductGet,
  addProductPost,
  updateProductGet,
  updateProductsPost,
  deleteProductByIdPost,
};
