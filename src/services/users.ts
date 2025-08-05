import axios from 'axios';
import { PaginationData } from '../types/user';

const API_URL = 'https://ecomove-be-dev.vercel.app';

export const getPaginatedUsers = async (
  page: number,
  limit: number = 10,
  token: string,
): Promise<PaginationData> => {
  try {
    const url = `${API_URL}/auth/list-pagination?page=${page}&limit=${limit}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.results;
  } catch (error) {
    throw error;
  }
};
