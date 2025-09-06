import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchDriversFailure,
  fetchDriversRequest,
  fetchDriversSuccess,
  fetchTransactionsFailure,
  fetchTransactionsRequest,
  fetchTransactionsSuccess,
  updateTransactionFailure,
  updateTransactionRequest,
  updateTransactionSuccess,
} from '../slices/transactionSlice';
import { fetchDriversApi, fetchTransactionsApi, updateTransactionApi } from '../services/transactionService';
import { SagaIterator } from 'redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import { Driver, Transaction } from '../types/transactionType';

function* fetchTransactionsSaga(action: ReturnType<typeof fetchTransactionsRequest>): SagaIterator {
  try {
    const { page, pageSize, search } = action.payload;
    const response = yield call(fetchTransactionsApi, page, pageSize, search);
    yield put(
      fetchTransactionsSuccess({
        data: response.data,
        total: response.total,
        page: response.page,
        pageSize: response.pageSize,
      }),
    );
  } catch (error: any) {
    yield put(fetchTransactionsFailure(error.message));
  }
}

function* updateTransactionSaga(action: ReturnType<typeof updateTransactionRequest>) {
  try {
    const { id, updates } = action.payload;
    const updated: Transaction = yield call(updateTransactionApi, id, updates);
    yield put(updateTransactionSuccess({ id, updates }));
  } catch (e: any) {
    yield put(updateTransactionFailure(e.message));
  }
}

function* fetchDriversSaga() {
  try {
    const drivers: Driver[] = yield call(fetchDriversApi);
    yield put(fetchDriversSuccess(drivers));
  } catch (error: any) {
    yield put(fetchDriversFailure(error.message));
  }
}

export function* transactionSaga() {
  yield all([
    takeLatest(fetchTransactionsRequest.type, fetchTransactionsSaga),
    takeLatest(updateTransactionRequest.type, updateTransactionSaga),
    takeLatest(fetchDriversRequest.type, fetchDriversSaga),
  ]);
}
