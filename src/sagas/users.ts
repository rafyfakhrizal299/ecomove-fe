import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { PaginationData, User } from '../types/user';
import {
  deleteUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  fetchUserAddressFailure,
  fetchUserAddressRequest,
  fetchUserAddressSuccess,
  fetchUsersFailure,
  fetchUsersRequest,
  fetchUsersSuccess,
  updateUserFailure,
  UpdateUserPayload,
  updateUserRequest,
  updateUserSuccess,
} from '../slices/users';
import { deleteUser, getPaginatedUsers, getUserAddress, updateUser } from '../services/users';
import { RootState } from '../store';
import { PayloadAction } from '@reduxjs/toolkit';
import { showNotification } from '../slices/notification';
import { Address } from '../types/address';

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
      const errorMessage = 'Authentication not found. Please log in again.';
      yield put(fetchUsersFailure(errorMessage));
      yield put(showNotification({ message: errorMessage, type: 'error' }));
      return;
    }

    const url = 'https://ecomove-be-dev.vercel.app/auth/list-pagination';

    const apiResponse: PaginationData = yield call(
      getPaginatedUsers,
      action.payload.page,
      action.payload.limit,
      token,
    );

    if (apiResponse && apiResponse.data) {
      const { data, page, limit, total, totalPages } = apiResponse;

      yield put(
        fetchUsersSuccess({
          data,
          page,
          limit,
          total,
          totalPages,
        }),
      );
      yield put(showNotification({ message: 'User list loaded successfully.', type: 'success' }));
    } else {
      const errorMessage = 'API response does not have a valid data structure.';
      yield put(fetchUsersFailure(errorMessage));
      yield put(showNotification({ message: errorMessage, type: 'error' }));
    }
  } catch (error: any) {
    const errorMessage = error.message || 'Failed to load user list.';
    console.error('Error in fetchUsersTask:', error);
    yield put(fetchUsersFailure(errorMessage));
    yield put(showNotification({ message: errorMessage, type: 'error' }));
  }
}

function* handleUpdateUser(action: PayloadAction<UpdateUserPayload>): Generator<any, void, any> {
  try {
    let token: string | null = yield select(getToken);
    if (!token) {
      token = localStorage.getItem('authToken');
    }
    if (!token) {
      const errorMessage = 'Authentication token not found. Please log in again.';
      yield put(updateUserFailure(errorMessage));
      yield put(showNotification({ message: errorMessage, type: 'error' }));
      yield put(fetchUsersRequest({ page: 1, limit: 10 }));
      return;
    }

    const { id, ...userData } = action.payload;
    const response: User = yield call(updateUser, id, userData, token);

    yield put(updateUserSuccess(response));
    yield put(showNotification({ message: 'User updated successfully.', type: 'success' }));

    yield put(fetchUsersRequest({ page: 1, limit: 10 }));
  } catch (error: any) {
    const errorMessage = error.message || 'Failed to update user.';
    yield put(updateUserFailure(errorMessage));
    yield put(showNotification({ message: errorMessage, type: 'error' }));

    yield put(fetchUsersRequest({ page: 1, limit: 10 }));
  }
}

function* handleDeleteUser(action: PayloadAction<string>): Generator<any, void, any> {
  try {
    let token: string | null = yield select(getToken);
    if (!token) {
      const errorMessage = 'Authentication token not found. Please log in again.';
      yield put(deleteUserFailure(errorMessage));
      yield put(showNotification({ message: errorMessage, type: 'error' }));
      yield put(fetchUsersRequest({ page: 1, limit: 10 }));
      return;
    }

    const id = action.payload;

    // ---- Tambahan: Validasi ID sebelum memanggil API ----
    if (!id || typeof id !== 'string') {
      const errorMessage = 'Invalid user ID. Cannot perform delete operation.';
      yield put(deleteUserFailure(errorMessage));
      yield put(showNotification({ message: errorMessage, type: 'error' }));
      yield put(fetchUsersRequest({ page: 1, limit: 10 }));
      return;
    }

    yield call(deleteUser, id, token);

    yield put(deleteUserSuccess(id));
    yield put(showNotification({ message: 'User deleted successfully.', type: 'success' }));
    yield put(fetchUsersRequest({ page: 1, limit: 10 }));
  } catch (error: any) {
    // ---- Perbaikan: Ambil pesan error dari respons API jika tersedia ----
    const errorMessage = error.response?.data?.message || 'Failed to delete user.';
    yield put(deleteUserFailure(errorMessage));
    yield put(showNotification({ message: errorMessage, type: 'error' }));
    yield put(fetchUsersRequest({ page: 1, limit: 10 }));
  }
}

function* fetchUserAddressTask(action: PayloadAction<string>): Generator<any, void, any> {
  try {
    let token: string | null = yield select(getToken);
    if (!token) {
      token = localStorage.getItem('authToken');
    }

    if (!token) {
      const errorMessage = 'Authentication token not found. Please log in again.';
      yield put(fetchUserAddressFailure(errorMessage));
      yield put(showNotification({ message: errorMessage, type: 'error' }));
      return;
    }

    const userId = action.payload;
    const response: Address[] = yield call(getUserAddress, userId, token);

    yield put(fetchUserAddressSuccess(response));
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch user addresses.';
    yield put(fetchUserAddressFailure(errorMessage));
    yield put(showNotification({ message: errorMessage, type: 'error' }));
  }
}

function* usersWatcher() {
  yield all([
    takeLatest(fetchUsersRequest as any, fetchUsersTask),
    takeLatest(updateUserRequest as any, handleUpdateUser),
    takeLatest(deleteUserRequest as any, handleDeleteUser),
    takeLatest(fetchUserAddressRequest as any, fetchUserAddressTask),
  ]);
}

export default usersWatcher;
