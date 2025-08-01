import { takeLatest, put, call } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { loginRequest, loginSuccess, loginFailure } from '../slices/auth';
import axios, { AxiosResponse } from 'axios';

function* handleLoginRequest(
  action: PayloadAction<{ email: string; password: string }>,
): Generator<any, void, any> {
  console.log('Payload received in Saga (handleLoginRequest):', action.payload);
  try {
    const userData = yield call(loginApi, action.payload);
    yield put(loginSuccess({ email: userData.email }));
  } catch (error: any) {
    yield put(loginFailure(error.message));
  }
}

function* loginApi(credentials: {
  email: string;
  password: string;
}): Generator<any, any, AxiosResponse> {
  const API_URL = 'https://ecomove-be-dev.vercel.app/auth/login';

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
