import express from 'express';
import { protect, authorize } from '../../middlewares/authMiddleware';
import { manager_role } from '../../utils/constants';
import {
  add__ThirdPartyService,
  update__ThirdPartyService,
  getAll__ThirdPartyServices,
  getOne__ThirdPartyService,
  delete__ThirdPartyService,
} from '../../controllers/refData/controller__ThirdPartyService';

const router = express.Router();
router.use(protect);
router.use(authorize(manager_role));

router.route('/').get(getAll__ThirdPartyServices).post(add__ThirdPartyService);

router
  .route('/:id')
  .get(getOne__ThirdPartyService)
  .put(update__ThirdPartyService)
  .delete(delete__ThirdPartyService);

export default router;
