import { takeLatest, put, call } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { signupFailure, signupRequest, signupSuccess } from '../slices/signupSlice';

function* callSignupApi(signupData: {
  serviceType: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  password: string;
  agreeToTerms: boolean;
}): Generator<any, any, any> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Logika simulasi:
      if (signupData.email === 'test@example.com') {
        // Contoh email yang akan gagal
        reject('Email already registered.');
      } else if (!signupData.agreeToTerms) {
        reject('You must agree to the terms of service.');
      } else {
        // Asumsi pendaftaran sukses
        console.log('User registered:', signupData.email);
        resolve({ message: 'Registration successful!' });
      }
    }, 1500); // Simulasi delay API
  });
}

function* signupSaga(
  action: PayloadAction<Parameters<typeof signupRequest>[0]>,
): Generator<any, void, any> {
  try {
    yield call(callSignupApi, action.payload);
    yield put(signupSuccess());
    // Anda bisa menambahkan navigasi ke halaman login di sini setelah sukses
    // atau di komponen UI menggunakan useEffect
  } catch (error: any) {
    yield put(signupFailure(error));
  }
}

export function* signupSagas() {
  yield takeLatest(signupRequest.type, signupSaga);
}
