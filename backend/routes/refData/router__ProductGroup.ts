import express from 'express';
import { protect, authorize } from '../../middlewares/authMiddleware';
import { manager_role } from '../../utils/constants';
import {
  add__ProductGroup,
  update__ProductGroup,
  getAll__ProductGroups,
  getOne__ProductGroup,
  delete__ProductGroup,
} from '../../controllers/refData/controller__ProductGroup';

const router = express.Router();
router.use(protect);
router.use(authorize(manager_role));

router.route('/').get(getAll__ProductGroups).post(add__ProductGroup);

router
  .route('/:id')
  .get(getOne__ProductGroup)
  .put(update__ProductGroup)
  .delete(delete__ProductGroup);

export default router;
