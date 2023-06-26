import express from 'express';
import { protect, authorize } from '../../middlewares/authMiddleware';
import { manager_role } from '../../utils/constants';
import {
  add__ServiceWork,
  update__ServiceWork,
  getAll__ServiceWorks,
  getOne__ServiceWork,
  delete__ServiceWork,
} from '../../controllers/refData/controller__ServiceWork';

const router = express.Router();
router.use(protect);
router.use(authorize(manager_role));

router.route('/').get(getAll__ServiceWorks).post(add__ServiceWork);

router
  .route('/:id')
  .get(getOne__ServiceWork)
  .put(update__ServiceWork)
  .delete(delete__ServiceWork);

export default router;
