const express = require('express');
const categoriesRouter = express.Router();

const categoriesControllers = require('../controllers/categoriesController');

categoriesRouter.get('/', categoriesControllers.categoriesGet);

module.exports = categoriesRouter;
