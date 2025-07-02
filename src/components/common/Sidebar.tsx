import React, { ComponentType, useEffect } from 'react'; // <--- TAMBAHKAN INI
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import LogoEco from '../../assets/img/Ecomove_Logo.png';

import {
  IoAddCircleOutline as _IoAddCircleOutline,
  IoReceiptOutline as _IoReceiptOutline,
  IoLocationOutline as _IoLocationOutline,
  IoPersonOutline as _IoPersonOutline,
  IoSunnyOutline as _IoSunnyOutline,
  IoMoonOutline as _IoMoonOutline,
  IoLogOutOutline as _IoLogOutOutline,
  IoHomeOutline as _IoHomeOutline,
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
  const IoHomeOutline = _IoHomeOutline as ComponentType<{ className?: string }>;
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
      <div className="flex items-center justify-center p-4 mb-6">
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

      <div
        className={`mt-auto p-4 border-t ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}
      >
        <div className="flex items-center justify-center mb-4 space-x-2">
          <span className="text-gray-600 dark:text-gray-400 text-sm">Light</span>
          <label
            htmlFor="theme-toggle"
            className="relative inline-flex items-center cursor-pointer"
          >
            <input
              type="checkbox"
              id="theme-toggle"
              className="sr-only peer" // sr-only untuk menyembunyikan checkbox asli
              checked={theme === 'dark'}
              onChange={toggleThemeMode}
            />
            {/* Toggle Track */}
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            {/* Ikon di dalam toggle (posisi relatif di dalam track div di atas) */}
            <div className="absolute left-0 right-0 flex justify-between px-1 text-xs items-center h-full pointer-events-none">
              <IoSunnyOutline className="w-4 h-4 text-gray-500 peer-checked:text-transparent transition-colors duration-300" />
              <IoMoonOutline className="w-4 h-4 text-transparent peer-checked:text-white transition-colors duration-300" />
            </div>
          </label>
          <span className="text-gray-600 dark:text-gray-400 text-sm">Dark</span>
        </div>

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
