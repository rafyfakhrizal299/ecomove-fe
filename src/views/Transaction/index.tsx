import React, { useState, useMemo, useEffect } from 'react';
import Card from '../../components/common/Card';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/mainStore';
import { fetchDriversRequest, fetchTransactionsRequest, updateTransactionRequest } from '../../slices/transactionSlice';

const statusOptions = [
  'Booked',
  'Booking Confirmed',
  'Out for pick up',
  'Picked up',
  'Sort at hub',
  'Out for delivery',
  'Delivery',
  'First Delivery Attempt Failed',
  'Second Delivery Attempt Failed',
  'Returned to Sender',
];

const Transaction: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: transactions,
    total,
    page,
    pageSize,
    loading,
    drivers = [],
  } = useSelector((state: RootState) => state.transaction);

  const [searchQuery, setSearchQuery] = useState('');
  const [notesDraft, setNotesDraft] = useState<{ [id: number]: string }>({});

  useEffect(() => {
    dispatch(fetchTransactionsRequest({ page: 1, pageSize: 5, search: '' }));
    dispatch(fetchDriversRequest());
  }, [dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    dispatch(fetchTransactionsRequest({ page: 1, pageSize, search: e.target.value }));
  };

  const paginate = (newPage: number) => {
    dispatch(fetchTransactionsRequest({ page: newPage, pageSize, search: searchQuery }));
  };

  const handleStatusChange = (id: number, status: string) => {
    dispatch(updateTransactionRequest({ id, updates: { status } }));
  };

  const handleDriverChange = (id: number, driverId: string) => {
    dispatch(updateTransactionRequest({ id, updates: { driverId } }));
  };

  const handleNotesChange = (id: number, value: string) => {
    setNotesDraft((prev) => ({ ...prev, [id]: value }));
  };

  const handleNotesSave = (id: number) => {
    if (notesDraft[id] !== undefined) {
      dispatch(updateTransactionRequest({ id, updates: { deliveryNotes: notesDraft[id] } }));
    }
  };

  return (
    <div className="py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Admin Transaction Management
      </h1>
      <Card className="p-5 mb-6 col-span-full">
        <div className="mb-6 flex justify-end">
          <input
            type="text"
            placeholder="Search transactions..."
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        {loading ? (
          <div className="text-center py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
            Loading...
          </div>
        ) : (
          <>
            <div className="overflow-x-auto w-full rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-600">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                      Booking
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                      Date and Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                      Driver
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                      Payment Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                      Payment Method
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {transactions.length > 0 ? (
                    transactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {transaction.tranID ?? '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {transaction.createdAt
                            ? new Date(transaction.createdAt).toLocaleString()
                            : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          <select
                            value={transaction.status}
                            onChange={(e) => handleStatusChange(transaction.id, e.target.value)}
                            className="border rounded-md px-2 py-1 dark:bg-gray-700 dark:border-gray-600"
                          >
                            {statusOptions.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          <select
                            value={transaction.driverId ?? ''}
                            onChange={(e) => handleDriverChange(transaction.id, e.target.value)}
                            className="px-2 py-1 border rounded-md dark:bg-gray-700 dark:text-white"
                          >
                            <option value="">Unassigned</option>
                            {Array.isArray(drivers) &&
                              drivers.map((driver) => (
                                <option key={driver.id} value={driver.id}>
                                  {driver.name}
                                </option>
                              ))}
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {transaction.paymentStatus}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {transaction.modeOfPayment}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white min-w-[250px] w-[300px]">
                          <textarea
                            rows={3}
                            value={notesDraft[transaction.id] ?? transaction.deliveryNotes ?? ''}
                            placeholder="Add Notes here..."
                            className="px-3 py-2 border rounded-lg w-full resize-none shadow-sm text-sm
                                      dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={(e) => handleNotesChange(transaction.id, e.target.value)}
                            onBlur={() => handleNotesSave(transaction.id)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleNotesSave(transaction.id);
                              }
                            }}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="px-6 py-4 text-center">
                        No transactions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-gray-700 dark:text-gray-400">
                Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, total)} of {total}{' '}
                entries
              </div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => paginate(page - 1)}
                  disabled={page === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  Prev
                </button>
                <button
                  onClick={() => paginate(page + 1)}
                  disabled={page * pageSize >= total}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  Next
                </button>
              </nav>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default Transaction;
