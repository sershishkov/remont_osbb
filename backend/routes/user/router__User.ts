import express from 'express';
const router = express.Router();

import {
  logout,
  getUserProfile,
  updateUserProfile,
} from '../../controllers/user/controller__User';
import { protect } from '../../middlewares/authMiddleware';
router.use(protect);

router.get('/logout', logout);
router.route('/profile').get(getUserProfile).put(updateUserProfile);

export default router;
