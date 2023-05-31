import express from 'express';
const router = express.Router();

import router__Auth from './user/router__Auth';
import router__User from './user/router__User';

router.use('/auth', router__Auth);
router.use('/user-admin', router__User);

export default router;
