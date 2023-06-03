import React from 'react';

const AddUser = React.lazy(() => import('../pages/users/AddUser'));
const EditUser = React.lazy(() => import('../pages/users/EditUser'));
const ListUser = React.lazy(() => import('../pages/users/ListUser'));

export const AdminRoutes = [
  { path: '/user-admin', component: <ListUser /> },
  { path: '/user-admin/add', component: <AddUser /> },
  { path: '/user-admin/:id', component: <EditUser /> },
];
