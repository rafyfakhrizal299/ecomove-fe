import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchTransactionsFailure,
  fetchTransactionsRequest,
  fetchTransactionsSuccess,
  updateTransactionFailure,
  updateTransactionSuccess,
} from '../slices/transactionSlice';
import { fetchTransactionsApi, updateTransactionApi } from '../services/transactionService';
import { SagaIterator } from 'redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import { Transaction } from '../types/transactionType';

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

function* updateTransactionSaga(
  action: PayloadAction<{ id: number; changes: Partial<Transaction> }>,
) {
  try {
    const { id, changes } = action.payload;
    const updated: Transaction = yield call(updateTransactionApi, id, changes);
    yield put(updateTransactionSuccess(updated));
  } catch (error: any) {
    yield put(updateTransactionFailure(error.message));
  }
}

export function* transactionSaga(): SagaIterator {
  yield takeLatest(fetchTransactionsRequest.type, fetchTransactionsSaga);
}
