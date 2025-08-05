import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserListResponse } from '../types/user';

interface UsersState {
  list: User[];
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const initialState: UsersState = {
  list: [],
  loading: false,
  error: null,
  page: 0,
  limit: 10,
  total: 0,
  totalPages: 0,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsersRequest(state, action: PayloadAction<{ page: number; limit: number }>) {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess: (
      state,
      action: PayloadAction<{
        data: User[];
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      }>,
    ) => {
      state.loading = false;
      state.error = null;
      state.list = action.payload.data; // Mengambil 'data' dari payload, menyimpannya sebagai 'list'
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.total = action.payload.total;
      state.totalPages = action.payload.totalPages;
    },
    fetchUsersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.list = [];
    },
  },
});

export const { fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure } = usersSlice.actions;

export default usersSlice.reducer;
