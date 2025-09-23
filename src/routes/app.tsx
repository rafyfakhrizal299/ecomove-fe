// src/routes.ts
import React from 'react';
import { RouteObject, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './../views/Login';
import HomePage from './../views/Home';
import SignupPage from '../views/Auth/SignupPage';
import UserManagement from '../views/UserManagement';
import Transaction from '../views/Transaction';
import { RootState } from './../store';

const AuthGuard: React.FC = () => {
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) {
    return <div>Memuat...</div>;
  }

  if (!isAuthenticated && !['/login', '/signup'].includes(location.pathname)) {
    return <Navigate to="/login" replace />;
  } else if (isAuthenticated && ['/login', '/signup'].includes(location.pathname)) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

const appRoutes: Array<RouteObject> = [
  {
    path: '/',
    element: <AuthGuard />,
    children: [
      {
        path: '/',
        element: <Navigate to="/home" replace />,
      },
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
        element: <HomePage />,
      },
      {
        path: '/user',
        element: <UserManagement />,
      },
      {
        path: '/transaction',
        element: <Transaction />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/home" replace />,
  },
];

export default appRoutes;
