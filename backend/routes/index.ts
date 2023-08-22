import express from 'express';
const router = express.Router();

import router__Auth from './user/router__Auth';
import router__AdminUsers from './user/router__AdminUsers';

import router__Unit from './refData/router__Unit';

import router__ProductGroup from './refData/router__ProductGroup';
import router__ProductType from './refData/router__ProductType';
import router__Product from './refData/router__Product';

import router__ServiceWork from './refData/router__ServiceWork';
import router__ServiceWorkGroup from './refData/router__ServiceWorkGroup';
import router__ThirdPartyService from './refData/router__ThirdPartyService';
import router__ThirdPartyServiceGroup from './refData/router__ThirdPartyServiceGroup';

router.use('/auth', router__Auth);
router.use('/users', router__AdminUsers);

router.use('/refdata/unit', router__Unit);
router.use('/refdata/productgroup', router__ProductGroup);
router.use('/refdata/producttype', router__ProductType);
router.use('/refdata/products', router__Product);

router.use('/refdata/servicework-group', router__ServiceWorkGroup);
router.use('/refdata/thirdpartyservice-group', router__ThirdPartyServiceGroup);
router.use('/refdata/serviceworks', router__ServiceWork);
router.use('/refdata/thirdpartyservices', router__ThirdPartyService);

export default router;
