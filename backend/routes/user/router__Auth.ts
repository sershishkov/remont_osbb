import express from 'express';
const router = express.Router();

import {
  register,
  login,
  logout,
  getUserProfile,
  updateUserProfile,
} from '../../controllers/user/controller__Auth';
import { protect } from '../../middlewares/authMiddleware';

router.post('/register', register);
router.post('/login', login);

router.use(protect);

router.get('/logout', logout);
router.route('/profile').get(getUserProfile).put(updateUserProfile);

export default router;
