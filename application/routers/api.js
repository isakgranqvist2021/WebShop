import express from 'express';
const router = express.Router();

import productsController from '../controllers/api/products';
import dataController from '../controllers/api/data';

router.get('/products', productsController.get);
router.post('/add-product', dataController.set);
router.get('/find-products', dataController.get);

export default router;