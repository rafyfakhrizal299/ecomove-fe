// src/components/common/Header.tsx
import React, { ComponentType } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../slices/auth';
import { toggleTheme } from '../../slices/themeSlice';

import {
  IoSunnyOutline as _IoSunnyOutline,
  IoMoonOutline as _IoMoonOutline,
  IoLogOutOutline as _IoLogOutOutline,
} from 'react-icons/io5';

const IoSunnyOutline = _IoSunnyOutline as ComponentType<{ className?: string }>;
const IoMoonOutline = _IoMoonOutline as ComponentType<{ className?: string }>;
const IoLogOutOutline = _IoLogOutOutline as ComponentType<{ className?: string }>;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const theme = useSelector((state: RootState) => state.theme.mode);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const toggleThemeMode = () => {
    dispatch(toggleTheme());
  };

  return (
    <header
      className={`bg-gray-50 dark:bg-gray-900 transition-colors duration-300 py-4 px-6 flex items-center justify-between fixed top-0 z-30 ${
        isAuthenticated ? 'left-64 w-[calc(100%-16rem)]' : 'left-0 w-full'
      }`}
    >
      <div className="flex items-center"></div>

      <div className="flex items-center space-x-4">
        {isAuthenticated && (
          <>
            <button
              onClick={toggleThemeMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {theme === 'dark' ? (
                <IoMoonOutline className="w-6 h-6 text-gray-200" />
              ) : (
                <IoSunnyOutline className="w-6 h-6 text-gray-600" />
              )}
            </button>

            <button
              onClick={handleLogout}
              className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-700 transition-colors duration-200"
              title="Logout"
            >
              <IoLogOutOutline className="w-6 h-6 text-green-600" />
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
