const express = require('express');
const categoriesControllers = require('../controllers/categoriesController');

const categoriesRouter = express.Router();

categoriesRouter.get('/', categoriesControllers.categoriesGet);

module.exports = categoriesRouter;
