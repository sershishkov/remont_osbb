import express from 'express';
import { protect, authorize } from '../../middlewares/authMiddleware';
import { manager_role } from '../../utils/constants';
import {
  add__ProductType,
  update__ProductType,
  getAll__ProductTypes,
  getOne__ProductType,
  delete__ProductType,
} from '../../controllers/refData/controller__ProductType';

const router = express.Router();
router.use(protect);
router.use(authorize(manager_role));

router.route('/').get(getAll__ProductTypes).post(add__ProductType);

router
  .route('/:id')
  .get(getOne__ProductType)
  .put(update__ProductType)
  .delete(delete__ProductType);

export default router;
