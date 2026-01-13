import { takeLatest, put, call } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { loginRequest, loginSuccess, loginFailure } from '../slices/auth';
import axios, { AxiosResponse } from 'axios';
import { fetchUsersRequest } from '../slices/users';

function* handleLoginRequest(
  action: PayloadAction<{ email: string; password: string }>,
): Generator<any, void, any> {
  try {
    const userData = yield call(loginApi, action.payload);

    const token = userData?.results?.token;
    const userEmail = userData?.results?.user?.email;

    if (token && userEmail) {
      localStorage.setItem('authToken', token);
      yield put(loginSuccess({ email: userEmail, token: token }));
      yield put(fetchUsersRequest({ page: 1, limit: 10 }));
    } else {
      throw new Error('Token or email not found in this process respons API.');
    }
  } catch (error: any) {
    yield put(loginFailure(error.message));
  }
}

function* loginApi(credentials: {
  email: string;
  password: string;
}): Generator<any, any, AxiosResponse> {
  const BASE_API_URL = process.env.REACT_APP_BE_URL || 'https://ecomove-be-dev.vercel.app';
  const API_URL = `${BASE_API_URL}/auth/login`;

  try {
    const response: AxiosResponse = yield call(axios.post, API_URL, credentials);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Invalid email or password.');
    }
    throw new Error('Network error or unexpected issue.');
  }
}

export function* authSaga() {
  yield takeLatest(loginRequest.type, handleLoginRequest);
}
