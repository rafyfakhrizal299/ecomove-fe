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
  fetchTransactionsApi,
  updateTransactionApi,
} from '../services/transactionService';
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

export function* createDriverSaga(
  action: ReturnType<typeof createDriverRequest>,
): Generator<any, void, any> {
  try {
    const apiResult: { id: string } = yield call(createDriverApi, {
      name: action.payload.name,
      licenseNumber: action.payload.licenseNumber,
      phoneNumber: action.payload.phoneNumber,
    });

    const newDriver: Driver = {
      id: apiResult.id,
      name: action.payload.name,
      licenseNumber: action.payload.licenseNumber,
      phoneNumber: action.payload.phoneNumber,
      email: '',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    yield put(createDriverSuccess(newDriver));

    if ((action.payload as any).transactionId) {
      yield put(
        updateTransactionRequest({
          id: (action.payload as any).transactionId,
          updates: { driverId: newDriver.id },
        }),
      );
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

export function* transactionSaga() {
  yield all([
    takeLatest(fetchTransactionsRequest.type, fetchTransactionsSaga),
    takeLatest(updateTransactionRequest.type, updateTransactionSaga),
    takeLatest(fetchDriversRequest.type, fetchDriversSaga),
    takeLatest('transaction/createDriverRequest', createDriverSaga),
    takeLatest(exportExcelRequest.type, exportExcelSaga),
  ]);
}
