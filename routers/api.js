import express from 'express';
const router = express.Router();

import productsController from '../controllers/api/products';

router.get('/products', productsController.get);

export default router;