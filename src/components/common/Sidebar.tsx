// src/components/Sidebar.tsx
import React, { ComponentType, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import LogoEco from '../../assets/img/Ecomove_Logo.png';

import {
  IoAddCircleOutline as _IoAddCircleOutline,
  IoReceiptOutline as _IoReceiptOutline,
  IoLocationOutline as _IoLocationOutline,
  IoHomeOutline as _IoHomeOutline,
} from 'react-icons/io5';

const IoAddCircleOutline = _IoAddCircleOutline as ComponentType<{ className?: string }>;
const IoReceiptOutline = _IoReceiptOutline as ComponentType<{ className?: string }>;
const IoLocationOutline = _IoLocationOutline as ComponentType<{ className?: string }>;
const IoHomeOutline = _IoHomeOutline as ComponentType<{ className?: string }>;

const Sidebar: React.FC = () => {
  const location = useLocation();
  const theme = useSelector((state: RootState) => state.theme.mode);

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

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      } shadow-md p-4 flex flex-col z-20 transition-colors duration-300`}
    >
      <div className="flex items-center justify-center py-[4px] mb-6">
        <Link to="/home">
          <img src={LogoEco} alt="Ecomove Logo" className="h-12 w-auto" />
        </Link>
      </div>

      <nav className="flex-grow space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors duration-200
              ${
                location.pathname === item.path
                  ? theme === 'dark'
                    ? 'bg-green-600 text-white'
                    : 'bg-green-100 text-green-700'
                  : theme === 'dark'
                  ? 'hover:bg-gray-900'
                  : 'hover:bg-gray-50'
              }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
