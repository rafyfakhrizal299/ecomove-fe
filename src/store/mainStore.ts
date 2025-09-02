import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import authReducer from '../slices/auth';
import usersReducer from '../slices/users';
import signupReducer from '../slices/signupSlice';
import themeReducer from '../slices/themeSlice';
import notificationReducer from '../slices/notification';
import transactionReducer from '../slices/transactionSlice';

import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  signup: signupReducer,
  theme: themeReducer,
  notification: notificationReducer,
  transaction: transactionReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // Nonaktifkan thunk jika Anda hanya menggunakan saga
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
