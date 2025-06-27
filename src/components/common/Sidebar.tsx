import React, { ComponentType, useEffect } from 'react'; // <--- TAMBAHKAN INI
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';

import {
  IoAddCircleOutline as _IoAddCircleOutline,
  IoReceiptOutline as _IoReceiptOutline,
  IoLocationOutline as _IoLocationOutline,
  IoPersonOutline as _IoPersonOutline,
  IoSunnyOutline as _IoSunnyOutline,
  IoMoonOutline as _IoMoonOutline,
  IoLogOutOutline as _IoLogOutOutline,
} from 'react-icons/io5';
import { toggleTheme } from '../../slices/themeSlice';
import { logout } from '../../slices/auth';

const Sidebar: React.FC = () => {
  const IoAddCircleOutline = _IoAddCircleOutline as ComponentType<{ className?: string }>;
  const IoReceiptOutline = _IoReceiptOutline as ComponentType<{ className?: string }>;
  const IoLocationOutline = _IoLocationOutline as ComponentType<{ className?: string }>;
  const IoSunnyOutline = _IoSunnyOutline as ComponentType<{ className?: string }>;
  const IoMoonOutline = _IoMoonOutline as ComponentType<{ className?: string }>;
  const IoLogOutOutline = _IoLogOutOutline as ComponentType<{ className?: string }>;
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.mode);
  const navigate = useNavigate();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleThemeMode = () => {
    dispatch(toggleTheme());
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const navItems = [
    {
      name: 'New Delivery',
      path: '/new-delivery',
      icon: <IoAddCircleOutline className="w-5 h-5" />,
    },
    { name: 'Transactions', path: '/transactions', icon: <IoReceiptOutline className="w-5 h-5" /> },
    {
      name: 'Saved Locations',
      path: '/saved-locations',
      icon: <IoLocationOutline className="w-5 h-5" />,
    },
    { name: 'Account', path: '/account', icon: <IoLocationOutline className="w-5 h-5" /> }, // Ini yang error
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 ${
        theme === 'dark' ? 'bg-eco-green text-white' : 'bg-white text-gray-800'
      } shadow-md p-4 flex flex-col z-20 transition-colors duration-300`}
    >
      <div className="flex items-center justify-center p-4 mb-6">
        <Link to="/home">
          <img src="/src/assets/ecomove-logo.png" alt="Ecomove Logo" className="h-12 w-auto" />
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
                  ? 'hover:bg-gray-700'
                  : 'hover:bg-gray-50'
              }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>

      <div
        className={`mt-auto p-4 border-t ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}
      >
        <button
          onClick={toggleThemeMode}
          className={`w-full flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors duration-200 mb-2
            ${
              theme === 'dark'
                ? 'bg-gray-700 text-white hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
        >
          {theme === 'light' ? (
            <>
              <IoMoonOutline className="w-5 h-5 mr-2" /> Dark Mode {/* Ini yang error */}
            </>
          ) : (
            <>
              <IoSunnyOutline className="w-5 h-5 mr-2" /> Light Mode {/* Ini yang error */}
            </>
          )}
        </button>

        <button
          onClick={handleLogout}
          className={`w-full flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors duration-200
            ${
              theme === 'dark'
                ? 'bg-red-700 text-white hover:bg-red-600'
                : 'bg-red-500 text-white hover:bg-red-600'
            }`}
        >
          <IoLogOutOutline className="w-5 h-5 mr-2" /> Log out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
