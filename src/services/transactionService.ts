import axios from 'axios';
import { Driver, Transaction, TransactionPageResponse } from '../types/transactionType';

const API_URL = 'https://ecomove-be-dev.vercel.app';

export const fetchTransactionsApi = async (
  page: number,
  pageSize: number,
  search: string,
): Promise<TransactionPageResponse> => {
  const response = await axios.get(`${API_URL}/transaction/page`, {
    params: { page, pageSize, search },
  });
  return response.data;
};

export const updateTransactionApi = async (
  id: number,
  updates: Partial<Transaction>
): Promise<Transaction> => {
  const response = await axios.put(`${API_URL}/transaction/${id}`, updates);
  return response.data;
};

export const fetchDriversApi = async (): Promise<Driver[]> => {
  const response = await axios.get(`${API_URL}/driver`);
  return Array.isArray(response.data) ? response.data : response.data.data;
};
