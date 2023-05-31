import express from 'express';
const router = express.Router();

import {
  register,
  login,
  logout,
  getMe,
  updateDetails,
  updatePassword,
} from '../../controllers/user/controller__Auth';
import { protect } from '../../middlewares/authMiddleware';

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', protect, getMe);

router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);

export default router;
