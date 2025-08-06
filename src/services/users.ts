import axios from 'axios';
import { PaginationData, User } from '../types/user';
import { UpdateUserPayload } from '../slices/users';

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

export const updateUser = async (
  id: string,
  userData: Omit<UpdateUserPayload, 'id'>, // Omit 'id' karena sudah ada di URL
  token: string,
): Promise<User> => {
  try {
    const url = `${API_URL}/auth/edit-user/${id}`;
    const response = await axios.put(url, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Pastikan header ini ada
      },
    });
    // Asumsi API mengembalikan objek User yang sudah diupdate langsung di response.data
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (id: number, token: string) => {
  try {
    const url = `${API_URL}/auth/users/${id}`;
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
