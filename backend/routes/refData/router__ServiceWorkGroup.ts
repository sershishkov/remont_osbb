import express from 'express';
import { protect, authorize } from '../../middlewares/authMiddleware';
import { manager_role } from '../../utils/constants';
import {
  add__ServiceWorkGroup,
  update__ServiceWorkGroup,
  getAll__ServiceWorkGroups,
  getOne__ServiceWorkGroup,
  delete__ServiceWorkGroup,
} from '../../controllers/refData/controller__ServiceWorkGroup';

const router = express.Router();
router.use(protect);
router.use(authorize(manager_role));

router.route('/').get(getAll__ServiceWorkGroups).post(add__ServiceWorkGroup);

router
  .route('/:id')
  .get(getOne__ServiceWorkGroup)
  .put(update__ServiceWorkGroup)
  .delete(delete__ServiceWorkGroup);

export default router;
