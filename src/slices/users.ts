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
export interface UpdateUserPayload {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  password?: string;
  canAccessCMS: boolean;
  role: string;
  serviceIds: number[];
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
    updateUserRequest(state, action: PayloadAction<UpdateUserPayload>) {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      const updatedUser = action.payload;
      const index = state.list.findIndex((user) => user.id === updatedUser.id);
      if (index !== -1) {
        state.list[index] = updatedUser;
      }
    },
    updateUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserRequest(state, action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.list = state.list.filter((user) => user.id !== action.payload);
    },
    deleteUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  updateUserFailure,
  updateUserRequest,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
} = usersSlice.actions;

export default usersSlice.reducer;
