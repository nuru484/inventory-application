const express = require('express');
const ejs = require('ejs');
const path = require('path');
require('dotenv').config();

const productsRouter = require('./routes/productsRoutes');
PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', productsRouter);

app.listen(PORT, () => {
  console.log(`App is live on port ${PORT}`);
});
