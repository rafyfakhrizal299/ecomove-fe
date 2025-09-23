import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
  message: string | null;
  type: 'success' | 'error' | null;
}

const initialState: NotificationState = {
  message: null,
  type: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (
      state,
      action: PayloadAction<{ message: string; type: 'success' | 'error' }>,
    ) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    hideNotification: (state) => {
      state.message = null;
      state.type = null;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
