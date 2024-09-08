const db = require('../db/queries');

const searchCategoryGet = async (req, res) => {
  try {
    const searchQuery = req.query.searchQuery; // Ensure this matches your form input name
    console.log(`search query: ${searchQuery}`);

    // Perform search for all the tables based on the query
    const products = await db.getProductBySearch(searchQuery, searchQuery); // Adjust as necessary
    const categories = await db.getCategoryBySearch(searchQuery);

    res.render('searchResults', {
      title: 'Search Results',
      products: products,
      categories: categories,
    });
  } catch (error) {
    console.error('Error during search:', error);
    res.status(500).json({ error: 'An error occurred while searching.' });
  }
};

module.exports = {
  searchCategoryGet,
};
