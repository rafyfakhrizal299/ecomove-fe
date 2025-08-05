import { all } from 'redux-saga/effects';
import { authSaga } from './auth';
import { signupSagas } from './signupSagas';
import usersWatcher from './users';

// Gabungkan semua saga di sini
export default function* rootSaga() {
  yield all([authSaga(), signupSagas(), usersWatcher()]);
  // Tambahkan saga lainnya di sini jika ada
}
