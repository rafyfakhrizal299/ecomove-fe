import { all } from 'redux-saga/effects';
import { authSaga } from './auth';
import { signupSagas } from './signupSagas';

// Gabungkan semua saga di sini
export default function* rootSaga() {
  yield all([
    authSaga(),
    signupSagas(),
    // Tambahkan saga lainnya di sini
  ]);
}
