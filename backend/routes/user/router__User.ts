import express from 'express';
import { protect, authorize } from '../../middlewares/authMiddleware';
import {
  add__User,
  update__User,
  getAll__Users,
  getOne__User,
  delete__User,
} from '../../controllers/user/controller__User';

const router = express.Router();
router.use(protect);
router.use(authorize(['admin']));

router.route('/').get(getAll__Users).post(add__User);

router.route('/:id').get(getOne__User).put(update__User).delete(delete__User);

export default router;
