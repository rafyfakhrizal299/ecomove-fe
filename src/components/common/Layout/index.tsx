// src/components/common/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

import Sidebar from '../Sidebar';

const Layout: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex min-h-screen">
      {isAuthenticated && <Sidebar />}

      <div className={`flex-1 flex flex-col ${isAuthenticated ? 'pl-64' : ''}`}>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
