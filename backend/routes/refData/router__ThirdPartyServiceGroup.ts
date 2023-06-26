import express from 'express';
import { protect, authorize } from '../../middlewares/authMiddleware';
import { manager_role } from '../../utils/constants';
import {
  add__ThirdPartyServiceGroup,
  update__ThirdPartyServiceGroup,
  getAll__ThirdPartyServiceGroups,
  getOne__ThirdPartyServiceGroup,
  delete__ThirdPartyServiceGroup,
} from '../../controllers/refData/controller__ThirdPartyServiceGroup';

const router = express.Router();
router.use(protect);
router.use(authorize(manager_role));

router
  .route('/')
  .get(getAll__ThirdPartyServiceGroups)
  .post(add__ThirdPartyServiceGroup);

router
  .route('/:id')
  .get(getOne__ThirdPartyServiceGroup)
  .put(update__ThirdPartyServiceGroup)
  .delete(delete__ThirdPartyServiceGroup);

export default router;
