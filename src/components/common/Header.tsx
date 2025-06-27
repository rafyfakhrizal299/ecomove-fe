// src/components/common/Header.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { logout } from 'slices/auth';
import LogoEco from '../../assets/img/Ecomove_Logo.png';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between fixed top-0 left-0 w-full z-10">
      <div className="flex items-center">
        <Link to={isAuthenticated ? '/home' : '/'}>
          <img src={LogoEco} alt="Ecomove Logo" className="h-10 w-auto" />
        </Link>
      </div>

      <nav className="hidden md:flex space-x-8">
        <Link
          to="#"
          className="text-gray-600 hover:text-green-600 font-medium transition-colors duration-200"
        >
          About us
        </Link>
        <Link
          to="#"
          className="text-gray-600 hover:text-green-600 font-medium transition-colors duration-200"
        >
          Shop
        </Link>
        <Link
          to="#"
          className="text-gray-600 hover:text-green-600 font-medium transition-colors duration-200"
        >
          Rates
        </Link>
        <Link
          to="#"
          className="text-gray-600 hover:text-green-600 font-medium transition-colors duration-200"
        >
          Track
        </Link>
      </nav>

      <div className="flex items-center space-x-3">
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 text-sm"
          >
            Log out
          </button>
        ) : (
          <>
            <Link
              to="/"
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors duration-200 text-sm"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 text-sm"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
