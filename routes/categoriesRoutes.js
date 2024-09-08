const express = require('express');
const categoriesRouter = express.Router();

const categoriesControllers = require('../controllers/categoriesController');

categoriesRouter.get('/', categoriesControllers.categoriesGet);
categoriesRouter.get('/add-category', categoriesControllers.addCategoriesGet);

module.exports = categoriesRouter;
