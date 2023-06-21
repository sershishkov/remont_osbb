import React from 'react';

const AddUnit = React.lazy(() => import('../pages/refData/unit/AddUnit'));
const EditUnit = React.lazy(() => import('../pages/refData/unit/EditUnit'));
const ListUnit = React.lazy(() => import('../pages/refData/unit/ListUnit'));

const AddProductGroup = React.lazy(
  () => import('../pages/refData/productgroup/AddProductGroup')
);
const EditProductGroup = React.lazy(
  () => import('../pages/refData/productgroup/EditProductGroup')
);
const ListProductGroup = React.lazy(
  () => import('../pages/refData/productgroup/ListProductGroup')
);

const AddProductType = React.lazy(
  () => import('../pages/refData/producttype/AddProductType')
);
const EditProductType = React.lazy(
  () => import('../pages/refData/producttype/EditProductType')
);
const ListProductType = React.lazy(
  () => import('../pages/refData/producttype/ListProductType')
);

const AddProducts = React.lazy(
  () => import('../pages/refData/products/AddProducts')
);
const EditProducts = React.lazy(
  () => import('../pages/refData/products/EditProducts')
);
const ListProducts = React.lazy(
  () => import('../pages/refData/products/ListProducts')
);

export const ManagerRoutes = [
  //** */
  { path: '/refdata/unit', component: <ListUnit /> },
  { path: '/refdata/unit/add', component: <AddUnit /> },
  { path: '/refdata/unit/:id', component: <EditUnit /> },
  //** */
  //** */
  { path: '/refdata/productgroup', component: <ListProductGroup /> },
  { path: '/refdata/productgroup/add', component: <AddProductGroup /> },
  { path: '/refdata/productgroup/:id', component: <EditProductGroup /> },
  //** */
  //** */
  { path: '/refdata/producttype', component: <ListProductType /> },
  { path: '/refdata/producttype/add', component: <AddProductType /> },
  { path: '/refdata/producttype/:id', component: <EditProductType /> },
  //** */
  //** */
  { path: '/refdata/products', component: <ListProducts /> },
  { path: '/refdata/products/add', component: <AddProducts /> },
  { path: '/refdata/products/:id', component: <EditProducts /> },
  //** */
];
