const express = require('express');
const suppliersRouter = express.Router();

const suppliersControllers = require('../controllers/suppliersController');

suppliersRouter.get('/', suppliersControllers.suppliersGet);
suppliersRouter.get('/add-supplier', suppliersControllers.addSupplierGet);
suppliersRouter.post('/add-supplier', suppliersControllers.addSupplierPost);
suppliersRouter.get('/:id', suppliersControllers.supplierDetailGet);
suppliersRouter.get('/update/:id', suppliersControllers.updateSupplierGet);
suppliersRouter.post('/update/:id', suppliersControllers.updateSupplierPost);

module.exports = suppliersRouter;
