import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

import Sidebar from '../Sidebar';
import Header from '../Header';

const Layout: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const isSidebarOpen = useSelector((state: RootState) => state.ui.isSidebarOpen);

  return (
    <div className="flex min-h-screen">
      {isAuthenticated && <Sidebar />}

      {/* Konten utama */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isAuthenticated ? (isSidebarOpen ? 'ml-64' : 'ml-16') : ''
        }`}
      >
        {isAuthenticated && <Header />}

        <main className="flex-1 overflow-x-hidden">
          <div
            className={`min-h-screen ${
              isAuthenticated ? 'pt-20 px-4 pb-6' : ''
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
