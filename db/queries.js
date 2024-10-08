const pool = require('./pool');

// PRODUCT QUERIES
async function getAllProducts() {
  try {
    const { rows } = await pool.query('SELECT * FROM products');
    return rows;
  } catch (err) {
    console.error('Error fetching products', err.stack);
  }
}

const getProductById = async (productId) => {
  const query = `
    SELECT p.product_id, p.name, p.description, p.price, p.quantity,
           p.category_id, c.category_name, 
           p.supplier_id, s.supplier_name
    FROM products p
    JOIN categories c ON p.category_id = c.category_id
    JOIN suppliers s ON p.supplier_id = s.supplier_id
    WHERE p.product_id = $1
  `;

  const values = [productId];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    console.error('Error fetching product by ID:', err);
    throw err;
  }
};

async function addProduct(
  name,
  description,
  price,
  quantity,
  categoryId,
  supplierId
) {
  try {
    await pool.query(
      'INSERT INTO products (name, description, price, quantity, category_id, supplier_id) VALUES ($1, $2, $3, $4, $5, $6)',
      [name, description, price, quantity, categoryId, supplierId]
    );
  } catch (err) {
    console.error('Error adding product', err.stack);
  }
}

async function updateProduct(
  product_id,
  name,
  description,
  price,
  quantity,
  categoryId,
  supplierId
) {
  try {
    const query = `UPDATE products
                     SET name = $1, description = $2, price = $3, quantity = $4,
                         category_id = $5, supplier_id = $6
                     WHERE product_id = $7`;
    const values = [
      name,
      description,
      price,
      quantity,
      categoryId,
      supplierId,
      product_id,
    ];

    await pool.query(query, values);
    console.log('Product updated successfully.');
  } catch (err) {
    console.error('Error updating product:', err.stack);
  }
}

async function getProductBySearch(name = '', description = '') {
  try {
    // Construct the query to search in both `name` and `description` fields
    const query =
      'SELECT * FROM products WHERE name ILIKE $1 OR description ILIKE $2';
    const values = [`%${name}%`, `%${description}%`];
    const { rows } = await pool.query(query, values);
    return rows;
  } catch (err) {
    console.error('Error executing search query', err.stack);
    throw err;
  }
}

async function deleteProductById(id) {
  try {
    const query = 'DELETE FROM products WHERE product_id = $1';
    await pool.query(query, [id]);
  } catch (err) {
    console.error('Error deleting product', err.stack);
  }
}

async function deleteAllProducts() {
  try {
    const query = 'DELETE FROM products';
    await pool.query(query);
  } catch (err) {
    console.error('Error deleting all products', err.stack);
  }
}

// SUPPLIER QUERIES
const getAllSuppliers = async () => {
  try {
    const { rows } = await pool.query('SELECT * FROM suppliers');
    return rows;
  } catch (error) {
    return `Error fetching suppliers: ${error}`;
  }
};

const getSupplierById = async (id) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM suppliers WHERE supplier_id = $1',
      [id]
    );
    return rows[0];
  } catch (error) {
    console.error('Error fetching product', error.stack);
    throw error;
  }
};

const getSupplierBySearch = async (supplierName) => {
  try {
    const query = `SELECT * FROM suppliers WHERE supplier_name ILIKE $1`;
    const values = [`%${supplierName}%`];
    const { rows } = await pool.query(query, values);
    return rows;
  } catch (error) {
    console.error(`Error fetching supplier: ${error.stack}`);
    throw error;
  }
};

async function addSupplier(supplierName, contactInfo) {
  try {
    const query =
      'INSERT INTO suppliers (supplier_name, contact_info) VALUES ($1, $2)';
    const values = [supplierName, contactInfo];
    await pool.query(query, values);
    console.log('Supplier added successfully.');
  } catch (err) {
    console.error('Error adding supplier:', err.stack);
  }
}

async function updateSupplier(supplierId, supplierName, contactInfo) {
  try {
    const query = `UPDATE suppliers
                     SET supplier_name = $1, contact_info = $2
                     WHERE supplier_id = $3`;
    const values = [supplierName, contactInfo, supplierId];
    await pool.query(query, values);
    console.log('Supplier updated successfully.');
  } catch (err) {
    console.error('Error updating supplier:', err.stack);
  }
}

async function deleteSupplierById(supplierId) {
  try {
    const query = 'DELETE FROM suppliers WHERE supplier_id = $1';
    await pool.query(query, [supplierId]);
    console.log('Supplier deleted successfully.');
  } catch (err) {
    console.error('Error deleting supplier:', err.stack);
  }
}

// CATEGORY QUERIES
const getAllCategories = async () => {
  try {
    const { rows } = await pool.query(`SELECT * FROM categories`);
    return rows;
  } catch (error) {
    console.error(`Error fetching categories: ${error.stack}`);
    throw error;
  }
};

async function getCategoryById(id) {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM categories WHERE category_id = $1',
      [id]
    );
    return rows[0];
  } catch (err) {
    console.error('Error fetching category', err.stack);
    throw err;
  }
}

const getCategoryBySearch = async (categoryName = '') => {
  try {
    // Correct the query to use SELECT * to get all columns
    const query = 'SELECT * FROM categories WHERE category_name ILIKE $1';
    const values = [`%${categoryName}%`];
    const { rows } = await pool.query(query, values);
    return rows;
  } catch (error) {
    console.error(`Error fetching categories: ${error.stack}`);
    throw error;
  }
};

async function addCategory(categoryName) {
  try {
    const query = 'INSERT INTO categories (category_name) VALUES ($1)';
    const values = [categoryName];
    await pool.query(query, values);
    console.log('Category added successfully.');
  } catch (err) {
    console.error('Error adding category:', err.stack);
  }
}

async function updateCategory(categoryId, categoryName) {
  try {
    const query = `UPDATE categories
                     SET category_name = $1
                     WHERE category_id = $2`;
    const values = [categoryName, categoryId];
    await pool.query(query, values);
    console.log('Category updated successfully.');
  } catch (err) {
    console.error('Error updating category:', err.stack);
  }
}

async function deleteCategoryById(categoryId) {
  try {
    const query = 'DELETE FROM categories WHERE category_id = $1';
    await pool.query(query, [categoryId]);
    console.log('Category deleted successfully.');
  } catch (err) {
    console.error('Error deleting category:', err.stack);
  }
}

module.exports = {
  // product queries
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  getProductBySearch,
  deleteProductById,
  deleteAllProducts,

  // suppliers queries
  getAllSuppliers,
  getSupplierById,
  getSupplierBySearch,
  addSupplier,
  updateSupplier,
  deleteSupplierById,

  // Category queries
  getAllCategories,
  getCategoryById,
  getCategoryBySearch,
  addCategory,
  updateCategory,
  deleteCategoryById,
};
