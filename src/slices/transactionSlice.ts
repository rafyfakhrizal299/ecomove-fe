import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Driver, Transaction } from '../types/transactionType';

interface TransactionState {
  data: Transaction[];
  total: number;
  page: number;
  pageSize: number;
  loading: boolean;
  error: string | null;
  drivers: Driver[];
  detail?: Transaction | null;
}

const initialState: TransactionState = {
  data: [],
  total: 0,
  page: 1,
  pageSize: 10,
  loading: false,
  error: null,
  drivers: [],
  detail: null,
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    fetchTransactionsRequest(
      state,
      _action: PayloadAction<{ page: number; pageSize: number; search: string }>,
    ) {
      state.loading = true;
      state.error = null;
    },
    fetchTransactionsSuccess(
      state,
      action: PayloadAction<{ data: Transaction[]; total: number; page: number; pageSize: number }>,
    ) {
      state.loading = false;
      state.data = action.payload.data;
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
    },
    fetchTransactionsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchDriversRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDriversSuccess(state, action: PayloadAction<Driver[]>) {
      state.loading = false;
      state.drivers = action.payload;
    },
    fetchDriversFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateTransactionRequest: (
      state,
      _action: PayloadAction<{ id: number; updates: Partial<Transaction> }>,
    ) => {
      state.loading = true;
      state.error = null;
    },
    updateTransactionSuccess: (
      state,
      action: PayloadAction<{ id: number; updates: Partial<Transaction> }>,
    ) => {
      const { id, updates } = action.payload;
      const index = state.data.findIndex((t) => t.id === id);

      if (index !== -1) {
        const updatedTransaction = {
          ...state.data[index],
          ...updates,
        };

        // kalau driverId diupdate, inject juga object driver dari state.drivers
        if (updates.driverId) {
          const driverObj = state.drivers.find((d) => d.id === updates.driverId);
          if (driverObj) {
            updatedTransaction.driver = driverObj;
          }
        }

        state.data[index] = updatedTransaction;
      }

      state.loading = false;
    },
    updateTransactionFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    createDriverRequest: (
      state,
      _action: PayloadAction<{ name: string; licenseNumber: string; phoneNumber: string }>,
    ) => {
      state.loading = true;
    },
    createDriverSuccess: (state, action: PayloadAction<Driver>) => {
      state.loading = false;
      state.drivers.push(action.payload); // langsung push aja
    },
    createDriverFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    exportExcelRequest: (
      state,
      _action: PayloadAction<{ startDate?: string; endDate?: string } | undefined>,
    ) => {
      state.loading = true;
      state.error = null;
    },
    exportExcelSuccess: (state) => {
      state.loading = false;
    },
    exportExcelFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchTransactionDetailRequest(state, _action: PayloadAction<number>) {
      state.loading = true;
      state.error = null;
    },
    fetchTransactionDetailSuccess(state, action: PayloadAction<Transaction>) {
      state.loading = false;
      state.detail = action.payload;
    },
    fetchTransactionDetailFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.detail = null;
    },
  },
});

export const {
  fetchTransactionsRequest,
  fetchTransactionsSuccess,
  fetchTransactionsFailure,
  updateTransactionRequest,
  updateTransactionSuccess,
  updateTransactionFailure,
  fetchDriversRequest,
  fetchDriversSuccess,
  fetchDriversFailure,
  createDriverRequest,
  createDriverSuccess,
  createDriverFailure,
  exportExcelRequest,
  exportExcelSuccess,
  exportExcelFailure,
  fetchTransactionDetailRequest,
  fetchTransactionDetailSuccess,
  fetchTransactionDetailFailure,
} = transactionSlice.actions;

export default transactionSlice.reducer;
