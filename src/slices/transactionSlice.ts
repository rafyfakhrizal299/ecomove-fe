import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction } from '../types/transactionType';

interface TransactionState {
  data: Transaction[];
  total: number;
  page: number;
  pageSize: number;
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  data: [],
  total: 0,
  page: 1,
  pageSize: 10,
  loading: false,
  error: null,
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
    updateTransactionRequest(
      _state,
      _action: PayloadAction<{ id: number; changes: Partial<Transaction> }>,
    ) {},
    updateTransactionSuccess(state, action: PayloadAction<Transaction>) {
      const index = state.data.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    updateTransactionFailure(state, action: PayloadAction<string>) {
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
} = transactionSlice.actions;

export default transactionSlice.reducer;
