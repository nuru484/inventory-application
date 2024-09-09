require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const path = require('path');

// Import your routers
const homepageRouter = require('./routes/homepageRoute');
const productsRouter = require('./routes/productsRoutes');
const categoriesRouter = require('./routes/categoriesRoutes');
const suppliersRouter = require('./routes/suppliersRoutes');
const searchRouter = require('./routes/searchRoute');

// Import the database initialization function
const initializeDatabase = require('./db/populatedb'); // Adjust the path based on where the file is

const PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Define your routes
app.use('/', homepageRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/suppliers', suppliersRouter);
app.use('/search', searchRouter);

// Wrap server initialization in an async IIFE
(async () => {
  try {
    // Initialize the database first
    console.log('Initializing the database...');
    await initializeDatabase();
    console.log('Database initialized successfully.');

    // Start the server only after the database is initialized
    app.listen(PORT, () => {
      console.log(`App is live on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to initialize the database:', error);
    process.exit(1); // Exit the process with an error if DB initialization fails
  }
})();
