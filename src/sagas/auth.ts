// src/sagas/auth.ts
import { takeLatest, put, call } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
// Pastikan path ini benar dan aksi-aksi ini diekspor sebagai named export dari slice
import { loginRequest, loginSuccess, loginFailure } from '../slices/auth';
import axios from 'axios'; // Pastikan axios sudah diinstal

// --- PERBAIKAN: Tipe aksi untuk PayloadAction ---
// Menggunakan 'typeof loginRequest.type' lebih aman karena mengambil tipe string dari aksi itu sendiri
function* handleLoginRequest(
  action: PayloadAction<{ username: string; password: string }>,
): Generator<any, void, any> {
  try {
    // Panggil fungsi API menggunakan 'call' effect
    // 'call' akan menjalankan fungsi 'loginApi' dengan argumen 'action.payload'
    const userData = yield call(loginApi, action.payload);

    // Dispatch aksi sukses
    // 'put' akan mendispatch aksi ke reducer
    yield put(loginSuccess({ username: userData.username })); // Sesuaikan dengan respons API Anda
  } catch (error: any) {
    // Dispatch aksi gagal dengan pesan error
    yield put(loginFailure(error.message));
  }
}

// --- FUNGSI API DI SAGA TETAP SAMA ---
// Simulasi panggilan API login
// Fungsi ini terisolasi dan bisa diuji secara terpisah
function* loginApi(credentials: { username: string; password: string }) {
  try {
    // Ganti URL ini dengan endpoint API backend Anda yang sebenarnya
    const response = yield call(axios.post, 'http://localhost:5000/api/auth/login', credentials);
    // Jika respons sukses, kembalikan data
    return response.data;
  } catch (error: any) {
    // Jika API mengembalikan error, lempar kembali error dengan pesan yang relevan
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Invalid username or password.');
    }
    throw new Error('Network error or unexpected issue.');
  }
}

// --- PERBAIKAN: Gunakan `loginRequest.type` ---
// Saga watcher: mendengarkan aksi loginRequest
export function* authSaga() {
  // Ambil aksi loginRequest terbaru dan jalankan handleLoginRequest
  // Menggunakan 'loginRequest.type' adalah cara yang disarankan untuk merujuk ke tipe aksi
  yield takeLatest(loginRequest.type, handleLoginRequest);
}
