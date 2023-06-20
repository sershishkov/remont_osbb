import express from 'express';
import { protect, authorize } from '../../middlewares/authMiddleware';
import { manager_role } from '../../utils/constants';
import {
  add__Product,
  update__Product,
  getAll__Products,
  getOne__Product,
  delete__Product,
} from '../../controllers/refData/controller__Product';

const router = express.Router();
router.use(protect);
router.use(authorize(manager_role));

router.route('/').get(getAll__Products).post(add__Product);

router
  .route('/:id')
  .get(getOne__Product)
  .put(update__Product)
  .delete(delete__Product);

export default router;
