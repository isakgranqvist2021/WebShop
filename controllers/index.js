import express from 'express';
const router = express.Router();

/*
    these routes can be accessed by users without a session
*/

/* import all the controllers */
import homeController from './index/home';
import signInController from './index/sign-in';
import signUpController from './index/sign-up';

/* register all the routes and attach a controller */
router.get('/', homeController.template);

router.get('/sign-in', signInController.template);
router.post('/sign-in/:authType', signInController.action);

router.get('/sign-up', signUpController.template);
router.post('/sign-up/:authType', signUpController.action);

/* export router variable to main.js */
export default router;