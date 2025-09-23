import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserListResponse } from '../types/user';
import { Address } from '../types/address';

interface UsersState {
  list: User[];
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  userAddress: Address[] | null; // State baru untuk menyimpan alamat
  userAddressLoading: boolean; // State baru untuk loading alamat
  userAddressError: string | null;
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
  userAddress: null,
  userAddressLoading: false,
  userAddressError: null,
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
    fetchUserAddressRequest: (state, action: PayloadAction<string>) => {
      // Menambahkan penanganan jika payload tidak valid
      if (!action.payload) {
        state.userAddressLoading = false;
        state.userAddressError = 'Invalid user ID provided.';
        return;
      }
      state.userAddressLoading = true;
      state.userAddressError = null;
      state.userAddress = null;
    },
    fetchUserAddressSuccess: (state, action: PayloadAction<Address[]>) => {
      state.userAddressLoading = false;
      state.userAddress = action.payload;
      state.userAddressError = null;
    },
    fetchUserAddressFailure: (state, action: PayloadAction<string>) => {
      state.userAddressLoading = false;
      state.userAddressError = action.payload;
    },
    clearUserAddress: (state) => {
      state.userAddress = null;
      state.userAddressError = null;
      state.userAddressLoading = false;
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
  fetchUserAddressRequest,
  fetchUserAddressSuccess,
  fetchUserAddressFailure,
  clearUserAddress,
} = usersSlice.actions;

export default usersSlice.reducer;
