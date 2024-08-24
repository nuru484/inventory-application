const express = require('express');
const homepageRouter = express.Router();
const homepageController = require('../controllers/homepageController.js');

homepageRouter.get('/', homepageController.homepage);

module.exports = homepageRouter;
