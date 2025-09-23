import React, { useEffect, useState } from 'react';
import Card from '../../components/common/Card';
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { getDashboardData } from '../../services/dashboardService';

interface TransactionSummary {
  totalDelivery: number;
  totalUser: number;
  totalRevenue: number;
}

interface ChartItem {
  name: string;
  delivery: number;
  revenue: number;
}

interface DashboardData {
  transactionSummary: TransactionSummary;
  charts: {
    weekly: ChartItem[];
    monthly: ChartItem[];
    yearly: ChartItem[];
  };
}

const HomePage: React.FC = () => {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const formatCurrency = (value: number) => `₱ ${new Intl.NumberFormat('en-PH').format(value)}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardData();
        setDashboard(data);
      } catch (error) {
        console.error('Failed to fetch dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center py-10 text-white">Loading...</p>;
  }

  if (!dashboard) {
    return <p className="text-center py-10 text-red-500">No data available</p>;
  }

  const { transactionSummary, charts } = dashboard;

  return (
    <div className="py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="p-5 text-center">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Total Delivery</h2>
          <p className="mt-2 text-3xl font-bold text-blue-600">
            {transactionSummary.totalDelivery}
          </p>
        </Card>

        <Card className="p-5 text-center">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Total User</h2>
          <p className="mt-2 text-3xl font-bold text-green-600">{transactionSummary.totalUser}</p>
        </Card>

        <Card className="p-5 text-center">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Total Revenue</h2>
          <p className="mt-2 text-3xl font-bold text-purple-600">
            {formatCurrency(transactionSummary.totalRevenue)}
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Per Minggu */}
        <Card className="p-5">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Statistik Weekly
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={charts.weekly} barCategoryGap="20%">
              <XAxis dataKey="name" />
              <Tooltip
                formatter={(value: number, name: string) =>
                  name === 'Revenue' ? formatCurrency(value) : value
                }
              />
              <Legend />
              <Bar dataKey="delivery" fill="#3b82f6" name="Total Delivery" />
              <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Per Bulan */}
        <Card className="p-5">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Statistik Monthly
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={charts.monthly} barCategoryGap="20%">
              <XAxis dataKey="name" />
              <Tooltip
                formatter={(value: number, name: string) =>
                  name === 'Revenue' ? formatCurrency(value) : value
                }
              />
              <Legend />
              <Bar dataKey="delivery" fill="#3b82f6" name="Total Delivery" />
              <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Per Tahun */}
        <Card className="p-5">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Statistik Yearly
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={charts.yearly} barCategoryGap="20%">
              <XAxis dataKey="name" />
              <Tooltip
                formatter={(value: number, name: string) =>
                  name === 'Revenue' ? formatCurrency(value) : value
                }
              />
              <Legend />
              <Bar dataKey="delivery" fill="#3b82f6" name="Total Delivery" />
              <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
