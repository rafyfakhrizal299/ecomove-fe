import axios from 'axios';

const API_URL = 'https://ecomove-be-dev.vercel.app';

export const getDashboardData = async () => {
  const response = await axios.get(`${API_URL}/transaction/dashboard`);
  return response.data.data;
};
