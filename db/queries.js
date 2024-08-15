const pool = require('./pool');

async function getAllProducts() {
  try {
    const { rows } = await pool.query('SELECT * FROM products');
    return rows;
  } catch (err) {
    console.error('Error fetching products', err.stack);
  }
}

async function getProductById(id) {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM products WHERE product_id = $1',
      [id]
    );
    return rows[0];
  } catch (err) {
    console.error('Error fetching product', err.stack);
    throw err;
  }
}

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
  productId,
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
      productId,
    ];
    await pool.query(query, values);
    console.log('Product updated successfully.');
  } catch (err) {
    console.error('Error updating product:', err.stack);
  }
}

async function getProducts(name, description) {
  try {
    const query =
      'SELECT * FROM products WHERE name ILIKE $1 OR description ILIKE $2';
    const values = [`%${name}%`, `%${description}%`];
    const { rows } = await pool.query(query, values);
    return rows;
  } catch (err) {
    console.error('Error executing search query', err.stack);
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
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  getProducts,
  deleteProductById,
  deleteAllProducts,
  addSupplier,
  updateSupplier,
  deleteSupplierById,
  addCategory,
  updateCategory,
  deleteCategoryById,
};
