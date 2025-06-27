import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth';
import signupReducer from './signupSlice';
import themeReducer from './themeSlice';

// Gabungkan semua reducer di sini
const rootReducer = combineReducers({
  auth: authReducer,
  signup: signupReducer,
  theme: themeReducer,
  // users: usersReducer,
});

export default rootReducer;
