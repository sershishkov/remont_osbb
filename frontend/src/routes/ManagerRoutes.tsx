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

const AddServiceWorkGroup = React.lazy(
  () => import('../pages/refData/servicework_group/AddServiceWorkGroup')
);
const EditServiceWorkGroup = React.lazy(
  () => import('../pages/refData/servicework_group/EditServiceWorkGroup')
);
const ListServiceWorkGroup = React.lazy(
  () => import('../pages/refData/servicework_group/ListServiceWorkGroup')
);

const AddThirdPartyServiceGroup = React.lazy(
  () =>
    import('../pages/refData/thirdpartyservice_group/AddThirdPartyServiceGroup')
);
const EditThirdPartyServiceGroup = React.lazy(
  () =>
    import(
      '../pages/refData/thirdpartyservice_group/EditThirdPartyServiceGroup'
    )
);
const ListThirdPartyServiceGroup = React.lazy(
  () =>
    import(
      '../pages/refData/thirdpartyservice_group/ListThirdPartyServiceGroup'
    )
);

const AddServiceWorks = React.lazy(
  () => import('../pages/refData/serviceworks/AddServiceWorks')
);
const EditServiceWorks = React.lazy(
  () => import('../pages/refData/serviceworks/EditServiceWorks')
);
const ListServiceWorks = React.lazy(
  () => import('../pages/refData/serviceworks/ListServiceWorks')
);

const AddThirdPartyServices = React.lazy(
  () => import('../pages/refData/thirdpartyservices/AddThirdPartyServices')
);
const EditThirdPartyServices = React.lazy(
  () => import('../pages/refData/thirdpartyservices/EditThirdPartyServices')
);
const ListThirdPartyServices = React.lazy(
  () => import('../pages/refData/thirdpartyservices/ListThirdPartyServices')
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
  //** */
  { path: '/refdata/servicework-group', component: <ListServiceWorkGroup /> },
  {
    path: '/refdata/servicework-group/add',
    component: <AddServiceWorkGroup />,
  },
  {
    path: '/refdata/servicework-group/:id',
    component: <EditServiceWorkGroup />,
  },
  //** */
  {
    path: '/refdata/thirdpartyservice-group',
    component: <ListThirdPartyServiceGroup />,
  },
  {
    path: '/refdata/thirdpartyservice-group/add',
    component: <AddThirdPartyServiceGroup />,
  },
  {
    path: '/refdata/thirdpartyservice-group/:id',
    component: <EditThirdPartyServiceGroup />,
  },
  //** */
  { path: '/refdata/serviceworks', component: <ListServiceWorks /> },
  { path: '/refdata/serviceworks/add', component: <AddServiceWorks /> },
  { path: '/refdata/serviceworks/:id', component: <EditServiceWorks /> },
  //** */
  //** */
  {
    path: '/refdata/thirdpartyservices',
    component: <ListThirdPartyServices />,
  },
  {
    path: '/refdata/thirdpartyservices/add',
    component: <AddThirdPartyServices />,
  },
  {
    path: '/refdata/thirdpartyservices/:id',
    component: <EditThirdPartyServices />,
  },
  //** */
];
