import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SignupState {
  loading: boolean;
  success: boolean;
  error: string | null;
  // Anda bisa menambahkan data pengguna yang didaftarkan di sini jika perlu
  // user: { email: string; firstName: string; lastName: string } | null;
}

const initialState: SignupState = {
  loading: false,
  success: false,
  error: null,
  // user: null,
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    signupRequest: (
      state,
      action: PayloadAction<{
        serviceType: string;
        firstName: string;
        lastName: string;
        mobileNumber: string;
        email: string;
        password: string;
        agreeToTerms: boolean;
      }>,
    ) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    signupSuccess: (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      // state.user = action.payload; // Jika ada data user yang dikembalikan dari API
    },
    signupFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
      // state.user = null;
    },
    resetSignupState: (state) => {
      // Untuk mereset state setelah sukses atau error
      state.loading = false;
      state.success = false;
      state.error = null;
      // state.user = null;
    },
  },
});

export const { signupRequest, signupSuccess, signupFailure, resetSignupState } =
  signupSlice.actions;

export default signupSlice.reducer;
