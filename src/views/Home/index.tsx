// src/views/Home/index.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../slices/auth';
import { RootState } from '../../store'; // Pastikan path ini benar

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  // Efek untuk mengarahkan kembali ke halaman login jika tidak terautentikasi
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Welcome, {user?.username || 'Guest'}!
        </h2>
        <p className="text-lg text-gray-600 mb-6">You have successfully logged in.</p>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;
