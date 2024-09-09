const express = require('express');
const productsControllers = require('../controllers/productsController');

const productsRouter = express.Router();

productsRouter.get('/', productsControllers.allProductsGet);
productsRouter.get('/add-product', productsControllers.addProductGet);
productsRouter.post('/add-product', productsControllers.addProductPost);
productsRouter.get('/:id', productsControllers.productDetailGet);
productsRouter.get('/update-product/:id', productsControllers.updateProductGet);
productsRouter.post(
  '/update-product/:id',
  productsControllers.updateProductsPost
);

productsRouter.get('/delete/:id', productsControllers.deleteProductByIdPost);

module.exports = productsRouter;
