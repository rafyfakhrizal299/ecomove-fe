// src/components/common/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

import Sidebar from '../Sidebar';
import Header from '../Header';

const Layout: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex min-h-screen">
      {isAuthenticated && <Sidebar />}

      <div className={`flex-1 flex flex-col `}>
        {isAuthenticated && <Header />}

        <main className="flex-1">
          <div
            className={`min-h-screen ${
              isAuthenticated ? 'pt-20 px-4 pb-6 pl-64' : ''
            } bg-gray-50 dark:bg-gray-900 transition-colors duration-300`}
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
