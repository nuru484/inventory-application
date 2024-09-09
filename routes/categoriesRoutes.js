const express = require('express');
const categoriesRouter = express.Router();

const categoriesControllers = require('../controllers/categoriesController');

categoriesRouter.get('/', categoriesControllers.categoriesGet);
categoriesRouter.get('/add-category', categoriesControllers.addCategoryGet);
categoriesRouter.post('/add-category', categoriesControllers.addCategoryPost);
categoriesRouter.get('/:id', categoriesControllers.categoryDetailGet);
categoriesRouter.get('/update/:id', categoriesControllers.updateCategoryGet);
categoriesRouter.post('/update/:id', categoriesControllers.updateCategoryPost);

module.exports = categoriesRouter;
