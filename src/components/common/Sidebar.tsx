// src/components/Sidebar.tsx
import React, { ComponentType, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import LogoEco from '../../assets/img/Ecomove_Logo.png';

import {
  IoReceiptOutline as _IoReceiptOutline,
  IoLocationOutline as _IoLocationOutline,
  IoHomeOutline as _IoHomeOutline,
  IoChevronForward as _IoChevronForward, // ganti toggle pakai panah
} from 'react-icons/io5';
import { toggleSidebar } from '../../slices/uiSlice';

const IoReceiptOutline = _IoReceiptOutline as ComponentType<{ className?: string }>;
const IoLocationOutline = _IoLocationOutline as ComponentType<{ className?: string }>;
const IoHomeOutline = _IoHomeOutline as ComponentType<{ className?: string }>;
const IoChevronForward = _IoChevronForward as ComponentType<{ className?: string }>;

const Sidebar: React.FC = () => {
  const location = useLocation();
  const theme = useSelector((state: RootState) => state.theme.mode);
  const isSidebarOpen = useSelector((state: RootState) => state.ui.isSidebarOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const navItems = [
    { name: 'Dashboard', path: '/home', icon: <IoHomeOutline className="w-5 h-5" /> },
    { name: 'Transactions', path: '/transaction', icon: <IoReceiptOutline className="w-5 h-5" /> },
    { name: 'User Management', path: '/user', icon: <IoLocationOutline className="w-5 h-5" /> },
  ];

  const toggleSidebarHandler = () => {
    dispatch(toggleSidebar());
  };

  return (
    <>
      {/* Overlay untuk mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebarHandler}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 transition-all duration-300 ease-in-out
          ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
          shadow-md flex flex-col
          ${isSidebarOpen ? 'w-64' : 'w-16'}
        `}
      >
        {/* Header / Logo + Toggle */}
        <div className="flex items-center justify-between p-4">
          <Link to="/home" className="flex items-center">
            {isSidebarOpen && <img src={LogoEco} alt="Ecomove Logo" className="h-8 w-auto" />}
          </Link>

          {/* Tombol toggle dengan animasi rotate */}
          <button
            onClick={toggleSidebarHandler}
            className={`p-2 rounded-md transition-colors duration-300
              ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}
            `}
          >
            <IoChevronForward
              className={`w-6 h-6 transform transition-transform duration-300
                ${isSidebarOpen ? 'rotate-180' : 'rotate-0'}
              `}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-grow space-y-2 mt-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => window.innerWidth < 1024 && dispatch(toggleSidebar())}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors duration-200
                ${
                  location.pathname === item.path
                    ? theme === 'dark'
                      ? 'bg-green-600 text-white'
                      : 'bg-green-100 text-green-700'
                    : theme === 'dark'
                    ? 'hover:bg-gray-700'
                    : 'hover:bg-gray-100'
                }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span
                className={`whitespace-nowrap transition-all duration-200 overflow-hidden ${
                  isSidebarOpen ? 'opacity-100 ml-1' : 'opacity-0 w-0'
                }`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
