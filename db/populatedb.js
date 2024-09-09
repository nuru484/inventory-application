const pool = require('./pool');

// Categories Table
const createCategoriesTableSQL = `
CREATE TABLE IF NOT EXISTS categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE
);`;

// Suppliers Table
const createSuppliersTableSQL = `
CREATE TABLE IF NOT EXISTS suppliers (
    supplier_id SERIAL PRIMARY KEY,
    supplier_name VARCHAR(100) NOT NULL UNIQUE,
    contact_info TEXT
);`;

// Products Table
const createProductsTableSQL = `
CREATE TABLE IF NOT EXISTS products (
  product_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  quantity INT NOT NULL,
  category_id INT REFERENCES categories(category_id) ON DELETE CASCADE,
  supplier_id INT REFERENCES suppliers(supplier_id) ON DELETE CASCADE
);`;

// Insert Categories
const insertCategoriesSQL = `
INSERT INTO categories (category_name) VALUES
('Fruits'),
('Vegetables'),
('Dairy'),
('Beverages');`;

// Insert Suppliers
const insertSuppliersSQL = `
INSERT INTO suppliers (supplier_name, contact_info) VALUES
('Fresh Farms', '123 Farm Road, Cityville'),
('Green Grocers', '456 Veggie Lane, Townsville'),
('Dairy World', '789 Milk Street, Metropolis'),
('Beverage Co.', '101 Drink Ave, Suburbia');`;

// Insert Products
const insertProductsSQL = `
INSERT INTO products (name, description, price, quantity, category_id, supplier_id) VALUES
('Apple', 'Fresh red apples', 0.50, 100, 1, 1),
('Banana', 'Ripe bananas', 0.30, 150, 1, 1),
('Carrot', 'Organic carrots', 0.20, 200, 2, 2),
('Milk', 'Whole milk', 1.20, 50, 3, 3),
('Orange Juice', '100% pure orange juice', 2.00, 30, 4, 4);`;

async function initializeDatabase() {
  try {
    console.log('Initializing the database...');

    // Create tables
    await pool.query(createCategoriesTableSQL);
    await pool.query(createSuppliersTableSQL);
    await pool.query(createProductsTableSQL);

    console.log('Tables created successfully.');

    // Insert initial data
    await pool.query(insertCategoriesSQL);
    await pool.query(insertSuppliersSQL);
    await pool.query(insertProductsSQL);

    console.log('Initial data inserted successfully.');
  } catch (err) {
    console.error('Error during database initialization:', err);
    throw err;
  }
}

module.exports = initializeDatabase;
