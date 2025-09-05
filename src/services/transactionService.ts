import axios from 'axios';
import { Transaction, TransactionPageResponse } from '../types/transactionType';

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
  changes: Partial<Transaction>,
): Promise<Transaction> => {
  const response = await axios.put(`${API_URL}/transaction/${id}`, changes);
  return response.data;
};
