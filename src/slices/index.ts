import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth';
import signupReducer from './signupSlice';

// Gabungkan semua reducer di sini
const rootReducer = combineReducers({
  auth: authReducer,
  signup: signupReducer,
  // users: usersReducer,
});

export default rootReducer;
