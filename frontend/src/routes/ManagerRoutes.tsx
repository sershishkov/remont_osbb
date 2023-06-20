import React from 'react';

const AddUnit = React.lazy(() => import('../pages/refData/unit/AddUnit'));
const EditUnit = React.lazy(() => import('../pages/refData/unit/EditUnit'));
const ListUnit = React.lazy(() => import('../pages/refData/unit/ListUnit'));

export const ManagerRoutes = [
  { path: '/refdata/unit', component: <ListUnit /> },
  { path: '/refdata/unit/add', component: <AddUnit /> },
  { path: '/refdata/unit/:id', component: <EditUnit /> },
];
