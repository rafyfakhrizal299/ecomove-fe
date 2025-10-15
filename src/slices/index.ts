import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth';
import signupReducer from './signupSlice';
import themeReducer from './themeSlice';
import usersReducer from './users';
import uiReducer from './uiSlice';

// Gabungkan semua reducer di sini
const rootReducer = combineReducers({
  auth: authReducer,
  signup: signupReducer,
  theme: themeReducer,
  users: usersReducer,
  ui: uiReducer,
});

export default rootReducer;
