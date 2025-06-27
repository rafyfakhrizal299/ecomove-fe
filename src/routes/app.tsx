import React from 'react';
import { RouteObject, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './../views/Login';
import HomePage from './../views/Home';

import { RootState } from './../store';
import SignupPage from 'views/Auth/SignupPage';

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
    path: '/',
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/home',
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  // Contoh rute lain yang Anda miliki (misalnya About)
  // {
  //   path: '/about',
  //   element: <ProtectedRoute><About /></ProtectedRoute>, // Lindungi rute About juga
  // },
  // Catch-all route untuk 404 - mengarahkan kembali ke login
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
];

export default appRoutes;
