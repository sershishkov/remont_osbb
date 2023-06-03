import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';

export interface ProtectedRouteProps {
  roles: string[];
}

const PrivateRoute = ({ roles }: ProtectedRouteProps) => {
  const { user } = useAppSelector((state: RootState) => state.auth__state);
  const role = user?.role;

  if (roles?.includes(role!)) {
    return <Outlet />;
  } else {
    return <Navigate to='/' />;
  }
};

export default PrivateRoute;
