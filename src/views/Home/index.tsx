// src/views/Home/index.tsx
import React from 'react';
import Card from '../../components/common/Card';

const HomePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Dashboard</h1>

      <Card className="mt-20 p-5">
        <p className="text-xl text-gray-700 dark:text-gray-300">
          Selamat datang kembali di Dashboard Anda!
        </p>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Di sini Anda akan menemukan ringkasan aktivitas dan akses cepat ke fitur-fitur penting.
        </p>
      </Card>

      {/* Placeholder untuk beberapa widget Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Widget 1: Ringkasan Pengiriman */}
        <Card className="mt-5 p-5">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Ringkasan Pengiriman
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Total Pengiriman: <span className="font-bold text-blue-600">120</span>
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Pengiriman Berlangsung: <span className="font-bold text-yellow-600">5</span>
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Pengiriman Selesai Hari Ini: <span className="font-bold text-green-600">3</span>
          </p>
        </Card>

        {/* Widget 2: Status Akun */}
        <Card className="mt-5 p-5">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Status Akun
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Tingkat Akun: <span className="font-bold text-purple-600">Premium</span>
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Saldo Kredit: <span className="font-bold text-green-600">Rp 500.000</span>
          </p>
        </Card>

        {/* Widget 3: Notifikasi Penting */}
        <Card className="mt-5 p-5">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Notifikasi
          </h2>
          <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400">
            <li>Pengumuman: Maintenance server pada 3 Juli.</li>
            <li>Promosi: Diskon 10% untuk pengiriman pertama bulan ini!</li>
          </ul>
        </Card>
      </div>

      {/* Anda bisa menambahkan lebih banyak bagian dashboard di sini */}
    </div>
  );
};

export default HomePage;
