const db = require('../db/queries');

const searchCategoryGet = async (req, res) => {
  try {
    const searchQuery = req.query.searchQuery;
    console.log(`search query: ${searchQuery}`);

    const products = await db.getProductBySearch(searchQuery, searchQuery);
    const categories = await db.getCategoryBySearch(searchQuery);
    const suppliers = await db.getAllSuppliers();

    res.render('searchResults', {
      title: 'Search Results',
      products,
      categories,
      suppliers,
    });
  } catch (error) {
    console.error('Error during search:', error);
    res.status(500).json({ error: 'An error occurred while searching.' });
  }
};

module.exports = {
  searchCategoryGet,
};
