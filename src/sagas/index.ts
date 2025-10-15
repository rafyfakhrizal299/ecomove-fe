import { all } from 'redux-saga/effects';
import { authSaga } from './auth';
import { signupSagas } from './signupSagas';
import usersWatcher from './users';
import { transactionSaga } from './transactionSagas';

export default function* rootSaga() {
  yield all([
    //prettier-ignore
    authSaga(),
    signupSagas(),
    usersWatcher(),
    transactionSaga(),
  ]);
}
