const express = require('express');
const productsConstrollers = require('../controllers/productsController');

const productsRouter = express.Router();

productsRouter.get('/', productsConstrollers.productsGet);

module.exports = productsRouter;
