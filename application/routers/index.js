import express from 'express';
const router = express.Router();

/*
    these routes can be accessed by users without a session
*/

/* import all the controllers */
import homeController from '../controllers/index/home';
import signInController from '../controllers/index/sign-in';
import signUpController from '../controllers/index/sign-up';
import collectionsController from '../controllers/index/collections';
import productsController from '../controllers/index/products';
import productController from '../controllers/index/product';
import cartController from '../controllers/index/cart';

/* register all the routes and attach a controller */
router.get('/', homeController.template);
router.get('/collections', collectionsController.template);

// authType will be something like 'form-auth', 'google-auth' etc..
router.get('/sign-in', signInController.template);
router.post('/sign-in/:authType', signInController.action);

router.get('/sign-up', signUpController.template);
router.post('/sign-up/:authType', signUpController.action);

router.get('/products', productsController.template);
router.get('/product/:product_id', productController.template);

router.get('/cart', cartController.template);
router.get('/add-to-cart/:pid', cartController.action_add);
router.get('/remove-from-cart/:pid', cartController.action_remove);

/* export router variable to main.js */
export default router;