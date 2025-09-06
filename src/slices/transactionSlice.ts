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
}

const initialState: TransactionState = {
  data: [],
  total: 0,
  page: 1,
  pageSize: 10,
  loading: false,
  error: null,
  drivers: [],
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
      _action: PayloadAction<{ id: number; updates: Partial<Transaction> }>
    ) => {},
    updateTransactionSuccess: (state, action: PayloadAction<{ id: number; updates: Partial<Transaction> }>) => {
        const { id, updates } = action.payload;
        const index = state.data.findIndex((t) => t.id === id);
        if (index !== -1) {
          state.data[index] = { ...state.data[index], ...updates };
        }
        state.loading = false;
      },
    updateTransactionFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
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
} = transactionSlice.actions;

export default transactionSlice.reducer;
