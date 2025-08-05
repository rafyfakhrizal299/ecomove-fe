import React from 'react';
import Card from '../../components/common/Card';

const HomePage: React.FC = () => {
  return (
    <div className="py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Dashboard</h1>

      <Card className="p-5 mb-6 col-span-full">
        <p className="text-xl text-gray-700 dark:text-gray-300">Welcome back to your Dashboard!</p>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Here you'll find a summary of your activity and quick access to important features.
        </p>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-5">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Delivery Summary
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Total Delivery: <span className="font-bold text-blue-600">120</span>
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Delivery in progress: <span className="font-bold text-yellow-600">5</span>
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Delivery Completed Today: <span className="font-bold text-green-600">3</span>
          </p>
        </Card>

        <Card className="p-5">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Account Status
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Account Level: <span className="font-bold text-purple-600">Premium</span>
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Credit Balance: <span className="font-bold text-green-600">500.000 PHP</span>
          </p>
        </Card>

        <Card className="p-5">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Notification
          </h2>
          <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400">
            <li>Announcement: Server maintenance on July 3rd.</li>
            <li>Promotion: 10% off first shipment of the month!</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
