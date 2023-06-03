import express from 'express';
const router = express.Router();

import router__Auth from './user/router__Auth';
import router__AdminUsers from './user/router__AdminUsers';

router.use('/auth', router__Auth);
router.use('/users', router__AdminUsers);

export default router;
