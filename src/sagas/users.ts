import { call, put, select, takeLatest } from 'redux-saga/effects';
import { PaginationData } from '../types/user';
import { fetchUsersFailure, fetchUsersRequest, fetchUsersSuccess } from '../slices/users';
import { getPaginatedUsers } from '../services/users';
import { RootState } from '../store';

const getToken = (state: RootState) => state.auth.token;

function* fetchUsersTask(action: {
  payload: { page: number; limit: number };
}): Generator<any, void, any> {
  try {
    let token: string | null = yield select(getToken);
    if (!token) {
      token = localStorage.getItem('authToken');
    }

    if (!token) {
      yield put(fetchUsersFailure('Tidak ada token otentikasi. Silakan login kembali.'));
      return;
    }

    const url = 'https://ecomove-be-dev.vercel.app/auth/list-pagination';

    // --- PENTING: UBAH TIPE INI MENJADI PaginationData ---
    const apiResponse: PaginationData = yield call(
      getPaginatedUsers,
      action.payload.page,
      action.payload.limit,
      token,
    );

    if (apiResponse && apiResponse.data) {
      const { data, page, limit, total, totalPages } = apiResponse; // <--- AKSES LANGSUNG DARI apiResponse

      yield put(
        fetchUsersSuccess({
          data,
          page,
          limit,
          total,
          totalPages,
        }),
      );
    } else {
      yield put(fetchUsersFailure('Respons API tidak memiliki struktur data yang valid.'));
    }
  } catch (error: any) {
    console.error('Error in fetchUsersTask:', error);
    yield put(fetchUsersFailure(error.message || 'Gagal memuat daftar pengguna.'));
  }
}

function* usersWatcher() {
  yield takeLatest(fetchUsersRequest, fetchUsersTask);
}

export default usersWatcher;
