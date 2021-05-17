import express from 'express';
const router = express.Router();

import accountController from './users/account';
import signOutController from './users/sign-out';

router.get('/account', accountController);
router.get('/sign-out', signOutController);

export default router;