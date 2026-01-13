import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  createDriverFailure,
  createDriverRequest,
  createDriverSuccess,
  exportExcelFailure,
  exportExcelRequest,
  exportExcelSuccess,
  fetchDriversFailure,
  fetchDriversRequest,
  fetchDriversSuccess,
  fetchTransactionDetailFailure,
  fetchTransactionDetailRequest,
  fetchTransactionDetailSuccess,
  fetchTransactionsFailure,
  fetchTransactionsRequest,
  fetchTransactionsSuccess,
  updateTransactionFailure,
  updateTransactionRequest,
  updateTransactionSuccess,
} from '../slices/transactionSlice';
import {
  createDriverApi,
  downloadExcelTransaction,
  fetchDriversApi,
  fetchTransactionDetailApi,
  fetchTransactionsApi,
  updateTransactionApi,
} from '../services/transactionService';
import { SagaIterator } from 'redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import { Driver, Transaction } from '../types/transactionType';

function* fetchTransactionsSaga(
  action: ReturnType<typeof fetchTransactionsRequest>
): SagaIterator {
  try {
    const { page, limit, search, statuses } = action.payload;

    const response = yield call(fetchTransactionsApi, page, limit, search, statuses);

    yield put(
      fetchTransactionsSuccess({
        data: response.data,
        pagination: response.pagination, // ✅ KUNCI
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

export function* createDriverSaga(
  action: ReturnType<typeof createDriverRequest>,
): Generator<any, void, any> {
  try {
    const newDriver: Driver = yield call(createDriverApi, {
      name: action.payload.name,
      licenseNumber: action.payload.licenseNumber,
      phoneNumber: action.payload.phoneNumber,
    });

    yield put(createDriverSuccess(newDriver));

    // If transactionId is in the payload, automatically update the transaction with the new driver
    if ((action.payload as any).transactionId) {
      const transactionId = (action.payload as any).transactionId;
      const updated: Transaction = yield call(updateTransactionApi, transactionId, { driverId: newDriver.id });
      yield put(updateTransactionSuccess({ id: transactionId, updates: { driverId: newDriver.id } }));
    }
  } catch (error: any) {
    yield put(createDriverFailure(error.message));
  }
}

function* exportExcelSaga(
  action: PayloadAction<{ startDate?: string; endDate?: string } | undefined>,
): Generator<any, void, any> {
  try {
    const blob = yield call(downloadExcelTransaction.exportExcel, action.payload);
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'transactions.xlsx');
    document.body.appendChild(link);
    link.click();
    link.remove();

    yield put(exportExcelSuccess());
  } catch (error: any) {
    yield put(exportExcelFailure(error.message));
  }
}

function* fetchTransactionDetailSaga(
  action: ReturnType<typeof fetchTransactionDetailRequest>,
): SagaIterator {
  try {
    const transaction: Transaction = yield call(fetchTransactionDetailApi, action.payload);
    yield put(fetchTransactionDetailSuccess(transaction));
  } catch (error: any) {
    yield put(fetchTransactionDetailFailure(error.message));
  }
}

export function* transactionSaga() {
  yield all([
    takeLatest(fetchTransactionsRequest.type, fetchTransactionsSaga),
    takeLatest(updateTransactionRequest.type, updateTransactionSaga),
    takeLatest(fetchDriversRequest.type, fetchDriversSaga),
    takeLatest('transaction/createDriverRequest', createDriverSaga),
    takeLatest(exportExcelRequest.type, exportExcelSaga),
    takeLatest(fetchTransactionDetailRequest.type, fetchTransactionDetailSaga),
  ]);
}
