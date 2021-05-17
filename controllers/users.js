import express from 'express';
const router = express.Router();

/*
    these routes can only be accessed by users with a valid session
*/

/* import all the controllers */
import accountController from './users/account';
import signOutController from './users/sign-out';

/* register all the routes and attach a controller */
router.get('/account', accountController.template);
router.post('/account', accountController.action);
router.get('/sign-out', signOutController.action);

/* export router variable to main.js */
export default router;