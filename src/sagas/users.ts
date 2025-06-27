import { call, put, takeLatest } from 'redux-saga/effects';
import { getUser } from '../services/users';
import { AxiosResponse } from 'axios';
import { getUserFailure, getUserRequest, getUserSuccess } from '../slices/users';

function* getUserTask(action: { payload: string }): Generator<any, void, AxiosResponse> {
  const { payload } = action;
  try {
    const response: AxiosResponse = yield call(getUser, payload);
    yield put(getUserSuccess(response.data));
  } catch (error) {
    yield put(getUserFailure());
  }
}

function* userWatcher() {
  yield takeLatest(getUserRequest, getUserTask);
}

export default userWatcher;
