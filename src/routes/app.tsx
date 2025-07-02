import React from 'react';
import { RouteObject, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './../views/Login';
import HomePage from './../views/Home';

import { RootState } from './../store';
import SignupPage from '../views/Auth/SignupPage';
import UserManagement from '../views/UserManagement';
import Transaction from '../views/Transaction';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const appRoutes: Array<RouteObject> = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/home',
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/user',
    element: (
      <ProtectedRoute>
        <UserManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: '/transaction',
    element: (
      <ProtectedRoute>
        <Transaction />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
];

export default appRoutes;
