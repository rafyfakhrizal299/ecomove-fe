import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: { email: string } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: true,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    rehydrate: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      state.loading = false;
    },
    loginRequest: (state, action: PayloadAction<LoginCredentials>) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ email: string; token: string }>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = { email: action.payload.email };
      state.token = action.payload.token; // <<-- SIMPAN TOKEN DI STATE
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null; // <<-- HAPUS TOKEN SAAT GAGAL
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null; // <<-- HAPUS TOKEN SAAT LOGOUT
      state.loading = false;
      state.error = null;
    },
  },
});

export const { rehydrate, loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
