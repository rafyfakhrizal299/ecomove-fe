import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/mainStore';
import {
  createDriverRequest,
  createDriverSuccess,
  fetchDriversRequest,
  fetchTransactionsRequest,
  updateTransactionRequest,
} from '../../slices/transactionSlice';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { SingleValue } from 'react-select';

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
  const [newDriver, setNewDriver] = useState<{ name: string; transactionId: number } | null>(null);
  const isSidebarOpen = useSelector((state: RootState) => state.ui.isSidebarOpen);

  useEffect(() => {
    dispatch(fetchTransactionsRequest({ page: 1, pageSize: 5, search: '' }));
    dispatch(fetchDriversRequest());
  }, [dispatch]);

  useEffect(() => {
    if (newDriver) {
      const created = drivers.find((d) => d.name?.toLowerCase() === newDriver.name.toLowerCase());
      if (created) {
        dispatch(
          updateTransactionRequest({
            id: newDriver.transactionId,
            updates: { driverId: created.id },
          }),
        );
        setNewDriver(null); // reset biar gak infinite loop
      }
    }
  }, [drivers, newDriver, dispatch]);

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

  const handleNotesChange = (id: number, value: string) => {
    setNotesDraft((prev) => ({ ...prev, [id]: value }));
  };

  const handleNotesSave = (id: number) => {
    if (notesDraft[id] !== undefined) {
      dispatch(updateTransactionRequest({ id, updates: { deliveryNotes: notesDraft[id] } }));
    }
  };

  return (
    <div className="py-6 sm:px-6 lg:px-8 w-full max-w-full overflow-x-hidden">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Admin Transaction Management
      </h1>
      <Card className="p-5 mb-6 w-full">
        <div className="mb-6 flex justify-end">
          <input
            type="text"
            placeholder="Search transactions..."
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button
            // onClick={downloadReport}
            className="ml-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Download Report
          </button>
        </div>

        {loading ? (
          <div className="text-center py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
            Loading...
          </div>
        ) : (
          <>
            <div className="py-6 sm:px-6 lg:px-8 w-full max-w-[calc(100vw-16rem)] overflow-x-hidden">
              <div className="overflow-auto max-h-[600px] w-full">
                <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-600 sticky top-0 z-10">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 whitespace-nowrap">
                        Booking
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 whitespace-nowrap">
                        Date and Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 whitespace-nowrap">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 whitespace-nowrap min-w-[250px]">
                        Driver
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 whitespace-nowrap">
                        Payment Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 whitespace-nowrap">
                        Payment Method
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 whitespace-nowrap min-w-[250px]">
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
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white min-w-[250px]">
                            <select
                              value={transaction.status}
                              onChange={(e) => handleStatusChange(transaction.id, e.target.value)}
                              className="border rounded-md px-2 py-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full max-w-[200px]"
                            >
                              {statusOptions.map((s) => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white min-w-[250px]">
                            <AsyncCreatableSelect
                              cacheOptions
                              defaultOptions={drivers.map((d) => ({
                                value: d.id,
                                label: d.name || '(No Name)',
                              }))}
                              loadOptions={(inputValue: string, callback) => {
                                const filtered = drivers
                                  .filter((d) =>
                                    (d.name ?? '').toLowerCase().includes(inputValue.toLowerCase()),
                                  )
                                  .map((d) => ({
                                    value: d.id,
                                    label: d.name || '(No Name)',
                                  }));
                                callback(filtered);
                              }}
                              onCreateOption={(inputValue: string) => {
                                const payload = {
                                  name: inputValue, // ✅ ini yang dipakai saga
                                  licenseNumber: 'TEMP-' + Date.now(),
                                  phoneNumber: '0000000000',
                                  transactionId: transaction.id,
                                };
                                dispatch(createDriverRequest(payload));
                              }}
                              onChange={(option: SingleValue<{ value: string; label: string }>) => {
                                if (option) {
                                  dispatch(
                                    updateTransactionRequest({
                                      id: transaction.id,
                                      updates: { driverId: option.value },
                                    }),
                                  );
                                }
                              }}
                              value={
                                transaction.driverId
                                  ? {
                                      value: transaction.driverId,
                                      label:
                                        transaction.driver?.name ||
                                        drivers.find((d) => d.id === transaction.driverId)?.name ||
                                        '(No Name)',
                                    }
                                  : null
                              }
                              placeholder="Select or create driver..."
                              className="text-sm w-full"
                              styles={{
                                control: (base: any, state: any) => ({
                                  ...base,
                                  backgroundColor: '#1F2937',
                                  borderColor: state.isFocused ? '#3B82F6' : '#374151',
                                  boxShadow: state.isFocused ? '0 0 0 1px #3B82F6' : 'none',
                                  '&:hover': {
                                    borderColor: '#3B82F6',
                                  },
                                  minHeight: '2.25rem',
                                  color: '#D1D5DB',
                                  maxWidth: '250px',
                                }),
                                menu: (base: any) => ({
                                  ...base,
                                  backgroundColor: '#1F2937',
                                  border: '1px solid #374151',
                                  zIndex: 9999,
                                  maxWidth: '250px',
                                }),
                                option: (base: any, state: any) => ({
                                  ...base,
                                  backgroundColor: state.isFocused
                                    ? '#374151'
                                    : state.isSelected
                                    ? '#3B82F6'
                                    : 'transparent',
                                  color: state.isSelected ? 'white' : '#D1D5DB',
                                  cursor: 'pointer',
                                }),
                                singleValue: (base: any) => ({
                                  ...base,
                                  color: '#D1D5DB',
                                }),
                                input: (base: any) => ({
                                  ...base,
                                  color: '#D1D5DB',
                                }),
                                placeholder: (base: any) => ({
                                  ...base,
                                  color: '#9CA3AF',
                                }),
                              }}
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            <div className="bg-cyan-700 text-white px-3 py-1 rounded-[20px] font-semibold border-white border-2 inline-block max-w-[120px] text-center">
                              {transaction.paymentStatus}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white max-w-[150px]">
                            {transaction.modeOfPayment}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white min-w-[250px] max-w-[300px]">
                            <textarea
                              rows={3}
                              value={notesDraft[transaction.id] ?? transaction.deliveryNotes ?? ''}
                              placeholder="Add Notes here..."
                              className="px-3 py-2 border rounded-lg w-full resize-none shadow-sm text-sm dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                        <td colSpan={7} className="px-6 py-4 text-center">
                          No transactions found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

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
