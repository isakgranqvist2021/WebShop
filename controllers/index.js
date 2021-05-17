import express from 'express';
const router = express.Router();

import homeController from './index/home';
import signInController from './index/sign-in';
import signUpController from './index/sign-up';

router.get('/', homeController);
router.get('/sign-in', signInController);
router.get('/sign-up', signUpController);

export default router;