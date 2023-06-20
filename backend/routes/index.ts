import express from 'express';
const router = express.Router();

import router__Auth from './user/router__Auth';
import router__AdminUsers from './user/router__AdminUsers';

import router__Unit from './refData/router__Unit';

import router__ProductGroup from './refData/router__ProductGroup';
import router__ProductType from './refData/router__ProductType';
import router__Product from './refData/router__Product';

router.use('/auth', router__Auth);
router.use('/users', router__AdminUsers);

router.use('/refdata/unit', router__Unit);
router.use('/refdata/productgroup', router__ProductGroup);
router.use('/refdata/producttype', router__ProductType);
router.use('/refdata/products', router__Product);

export default router;
