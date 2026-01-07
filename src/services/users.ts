import axiosInstance from '../lib/axios';
import { PaginationData, User } from '../types/user';
import { UpdateUserPayload } from '../slices/users';
import { Address } from '../types/address';

export const getPaginatedUsers = async (
  page: number,
  limit: number = 10,
): Promise<PaginationData> => {
  const response = await axiosInstance.get('/auth/list-pagination', {
    params: { page, limit },
  });
  return response.data.results;
};

export const updateUser = async (
  id: string,
  userData: Omit<UpdateUserPayload, 'id'>,
): Promise<User> => {
  const response = await axiosInstance.put(`/auth/edit-user/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await axiosInstance.delete(`/auth/users/${id}`);
  return response.data;
};

export const getUserAddress = async (id: string): Promise<Address[]> => {
  const response = await axiosInstance.get(`/address/get-by-user/${id}`);
  return response.data.results;
};
