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
    const apiResponse: PaginationData = yield call(
      getPaginatedUsers,
      action.payload.page,
      action.payload.limit,
    );

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
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Failed to load user list.';
    yield put(fetchUsersFailure(errorMessage));
    yield put(showNotification({ message: errorMessage, type: 'error' }));
  }
}

function* handleUpdateUser(action: PayloadAction<UpdateUserPayload>): Generator<any, void, any> {
  try {
    const { id, ...userData } = action.payload;

    const response: User = yield call(updateUser, id, userData);

    yield put(updateUserSuccess(response));
    yield put(showNotification({ message: 'User updated successfully.', type: 'success' }));
    yield put(fetchUsersRequest({ page: 1, limit: 10 }));
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Failed to update user.';
    yield put(updateUserFailure(errorMessage));
    yield put(showNotification({ message: errorMessage, type: 'error' }));
  }
}

function* handleDeleteUser(action: PayloadAction<string>): Generator<any, void, any> {
  try {
    const id = action.payload;

    yield call(deleteUser, id);

    yield put(deleteUserSuccess(id));
    yield put(showNotification({ message: 'User deleted successfully.', type: 'success' }));
    yield put(fetchUsersRequest({ page: 1, limit: 10 }));
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Failed to delete user.';
    yield put(deleteUserFailure(errorMessage));
    yield put(showNotification({ message: errorMessage, type: 'error' }));
  }
}

function* fetchUserAddressTask(action: PayloadAction<string>): Generator<any, void, any> {
  try {
    const userId = action.payload;
    const response: Address[] = yield call(getUserAddress, userId);

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
