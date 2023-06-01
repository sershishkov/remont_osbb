import express from 'express';
const router = express.Router();

import { register, login } from '../../controllers/user/controller__Auth';

router.post('/register', register);
router.post('/login', login);

export default router;
