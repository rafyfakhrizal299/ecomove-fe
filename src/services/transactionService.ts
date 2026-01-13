import axiosInstance from '../lib/axios';
import { Driver, Transaction, TransactionPageResponse } from '../types/transactionType';

export const fetchTransactionsApi = async (
  page: number,
  pageSize: number,
  search: string,
  statuses?: string[],
): Promise<TransactionPageResponse> => {
  const params: any = { page, pageSize, search };

  if (statuses && statuses.length > 0) {
    params.statuses = statuses.join(',');
  }

  const response = await axiosInstance.get('/transaction/page', {
    params,
  });
  return response.data;
};

export const updateTransactionApi = async (
  id: number,
  updates: Partial<Transaction>,
): Promise<Transaction> => {
  const response = await axiosInstance.put(`/transaction/${id}`, updates);
  return response.data;
};

export const fetchDriversApi = async (): Promise<Driver[]> => {
  const response = await axiosInstance.get('/driver');
  return Array.isArray(response.data) ? response.data : response.data.data;
};

export const createDriverApi = async (driver: {
  name: string;
  licenseNumber: string;
  phoneNumber: string;
}): Promise<Driver> => {
  const response = await axiosInstance.post('/driver', driver);
  // Backend returns {status, message, data: {...}} so we need to extract the data property
  return response.data.data || response.data as Driver;
};

export const downloadExcelTransaction = {
  exportExcel: async (params?: { startDate?: string; endDate?: string }) => {
    let url = '/export/transactions/excel';

    if (params?.startDate && params?.endDate) {
      url += `?startDate=${params.startDate}&endDate=${params.endDate}`;
    }

    const response = await axiosInstance.get(url, {
      responseType: 'blob',
    });
    return response.data;
  },
};

export const fetchTransactionDetailApi = async (
  id: number
): Promise<Transaction> => {
  const response = await axiosInstance.get(`/transaction/${id}`);
  return response.data.data;
};
