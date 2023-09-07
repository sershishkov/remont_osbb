import express from 'express';
import { protect, authorize } from '../../middlewares/authMiddleware';
import { manager_role } from '../../utils/constants';
import {
  add__WorkerProfession,
  update__WorkerProfession,
  getAll__WorkerProfessions,
  getOne__WorkerProfession,
  delete__WorkerProfession,
} from '../../controllers/refData/controller__WorkerProfession';

const router = express.Router();
router.use(protect);
router.use(authorize(manager_role));

router.route('/').get(getAll__WorkerProfessions).post(add__WorkerProfession);

router
  .route('/:id')
  .get(getOne__WorkerProfession)
  .put(update__WorkerProfession)
  .delete(delete__WorkerProfession);

export default router;
