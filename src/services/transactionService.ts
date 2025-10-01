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
  updates: Partial<Transaction>,
): Promise<Transaction> => {
  const response = await axios.put(`${API_URL}/transaction/${id}`, updates);
  return response.data;
};

export const fetchDriversApi = async (): Promise<Driver[]> => {
  const response = await axios.get(`${API_URL}/driver`);
  return Array.isArray(response.data) ? response.data : response.data.data;
};

export const createDriverApi = async (driver: {
  name: string;
  licenseNumber: string;
  phoneNumber: string;
}): Promise<Driver> => {
  const response = await axios.post(`${API_URL}/driver`, driver);
  return response.data as Driver;
};

export const downloadExcelTransaction = {
  exportExcel: async (params?: { startDate?: string; endDate?: string }) => {
    let url = `${API_URL}/export/transactions/excel`;

    if (params?.startDate && params?.endDate) {
      url += `?startDate=${params.startDate}&endDate=${params.endDate}`;
    }

    const response = await axios.get(url, {
      responseType: 'blob',
    });
    return response.data;
  },
};
