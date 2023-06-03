import React from 'react';

import InfoUserPage from '../pages/InfoUserPage';
const UserEditDetails = React.lazy(
  () => import('../pages/auth/UserEditDetails')
);

export const UserRoutes = [
  { path: '/user-profile', component: <UserEditDetails /> },
  { path: '/infouser', component: <InfoUserPage /> },
];
