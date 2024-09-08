require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const path = require('path');

const homepageRouter = require('./routes/homepageRoute');
const productsRouter = require('./routes/productsRoutes');
const categoriesRouter = require('./routes/categoriesRoutes');

PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', homepageRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);

app.listen(PORT, () => {
  console.log(`App is live on port ${PORT}`);
});
