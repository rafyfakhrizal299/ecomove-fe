import axiosInstance from '../lib/axios';

export const getDashboardData = async () => {
  const response = await axiosInstance.get('/transaction/dashboard');
  return response.data.data;
};