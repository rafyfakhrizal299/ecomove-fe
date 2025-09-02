import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchTransactionsFailure,
  fetchTransactionsRequest,
  fetchTransactionsSuccess,
} from '../slices/transactionSlice';
import { fetchTransactionsApi } from '../services/transactionService';
import { SagaIterator } from 'redux-saga';

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

export function* transactionSaga(): SagaIterator {
  yield takeLatest(fetchTransactionsRequest.type, fetchTransactionsSaga);
}
