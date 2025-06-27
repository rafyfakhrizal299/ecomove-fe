// src/slices/auth.ts
// TIDAK ADA 'createAsyncThunk' di file ini
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: { username: string } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Aksi untuk memicu Saga
    loginRequest: (state, action: PayloadAction<{ username: string; password: string }>) => {
      state.loading = true;
      state.error = null;
    },
    // Aksi yang dipicu oleh Saga setelah sukses
    loginSuccess: (state, action: PayloadAction<{ username: string }>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    // Aksi yang dipicu oleh Saga setelah gagal
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
});

// Ekspor aksi-aksi ini sebagai named export
export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;

// Ekspor reducer default
export default authSlice.reducer;
