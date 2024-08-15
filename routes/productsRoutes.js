const express = require('express');
const productsControllers = require('../controllers/productsController');

const productsRouter = express.Router();

productsRouter.get('/', productsControllers.productsGet);
productsRouter.get('/add-product', productsControllers.addProductGet);
productsRouter.post('/products', productsControllers.addProductsPost);
productsRouter.get('/update-product/:id', productsControllers.updateProductGet);
productsRouter.post('/update-product', productsControllers.updateProductsPost);
productsRouter.post('/delete', productsControllers.deleteProductByIdPost);

module.exports = productsRouter;
