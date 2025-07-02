// src/views/UserPage/index.tsx
import React from 'react'; // Penting untuk JSX, meskipun new JSX transform

const UserManagement: React.FC = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ini Halaman User</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Konten user akan ditampilkan di sini.
        </p>
        <p className="mt-4 text-sm text-gray-500">
          (Ini adalah placeholder sementara tanpa data dinamis)
        </p>
      </div>
    </div>
  );
};

export default UserManagement;
