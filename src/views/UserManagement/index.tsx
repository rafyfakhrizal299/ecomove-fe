// src/views/UserPage/index.tsx
import React from 'react'; // Penting untuk JSX, meskipun new JSX transform
import Card from '../../components/common/Card';

const UserManagement: React.FC = () => {
  return (
    <div className="py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        This is the User Page
      </h1>
      <Card className="p-5 mb-6 col-span-full">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          User content will be displayed here.
        </p>
        <p className="mt-4 text-sm text-gray-500">
          (This is a temporary placeholder without dynamic data.)
        </p>
      </Card>
    </div>
  );
};

export default UserManagement;
