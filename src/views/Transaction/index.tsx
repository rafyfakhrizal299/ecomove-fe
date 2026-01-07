import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/mainStore';
import {
  createDriverRequest,
  exportExcelRequest,
  fetchDriversRequest,
  fetchTransactionDetailRequest,
  fetchTransactionsRequest,
  updateTransactionRequest,
} from '../../slices/transactionSlice';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { SingleValue } from 'react-select';
import HistoryTransaction from './historyTransaction';

const statusOptions = [
  'Booked',
  'Booking Confirmed',
  'Out for pick up',
  'Picked up',
  'Sort at hub',
  'Out for delivery',
  'Delivered',
  'multiple delivery attempts failed',
  'Returned to Sender',
];

const Transaction: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: transactions,
    total,
    page,
    loading,
    totalPages,
    drivers = [],
  } = useSelector((state: RootState) => state.transaction);

  const [searchQuery, setSearchQuery] = useState('');
  const [notesDraft, setNotesDraft] = useState<{ [id: number]: string }>({});
  const [newDriver, setNewDriver] = useState<{ name: string; transactionId: number } | null>(null);
  const isSidebarOpen = useSelector((state: RootState) => state.ui.isSidebarOpen);
  const [showExportModal, setShowExportModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  // const totalPages = Math.ceil(total / totalPages);
  const start = total > 0 ? (page - 1) * totalPages + 1 : 0;
  const end = total > 0 ? Math.min(page * totalPages, total) : 0;
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchTransactionsRequest({ page: 1, totalPages: 5, search: '' }));
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
        setNewDriver(null);
      }
    }
  }, [drivers, newDriver, dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    dispatch(fetchTransactionsRequest({ page: 1, totalPages, search: e.target.value }));
  };

  const paginate = (newPage: number) => {
    dispatch(fetchTransactionsRequest({ page: newPage, totalPages, search: searchQuery }));
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

  const handleViewHistory = (id: number) => {
    dispatch(fetchTransactionDetailRequest(id));
    setSelectedTransactionId(id);
    setShowHistoryModal(true);
  };

  return (
    <div className="py-6 sm:px-6 lg:px-8 w-full max-w-full">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Admin Transaction Management
      </h1>
      <Card className="p-5 mb-6 w-full">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full sm:w-64 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <button
            onClick={() => setShowExportModal(true)}
            className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors whitespace-nowrap"
          >
            Download Report
          </button>
        </div>

        {loading ? (
          <div className="text-center py-4 text-sm font-medium text-gray-900 dark:text-white">
            Loading...
          </div>
        ) : (
          <>
            <div className="w-full overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="overflow-auto max-h-[600px] w-full">
                <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 min-w-[1200px]">
                  <thead className="bg-gray-50 dark:bg-gray-600 sticky top-0 z-10">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 whitespace-nowrap min-w-[80px]">
                        ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 whitespace-nowrap min-w-[100px]">
                        Booking
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 whitespace-nowrap min-w-[180px]">
                        Date and Time
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 whitespace-nowrap min-w-[200px]">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 whitespace-nowrap min-w-[250px]">
                        Driver
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 whitespace-nowrap min-w-[150px]">
                        Payment Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 whitespace-nowrap min-w-[150px]">
                        Payment Method
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 whitespace-nowrap min-w-[250px]">
                        Notes
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 whitespace-nowrap min-w-[140px]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {transactions.length > 0 ? (
                      transactions.map((transaction) => (
                        <tr
                          key={transaction.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {transaction.id ?? '-'}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {transaction.tranID ?? '-'}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {transaction.createdAt
                              ? new Date(transaction.createdAt).toLocaleString()
                              : '-'}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            <select
                              value={transaction.status}
                              onChange={(e) => handleStatusChange(transaction.id, e.target.value)}
                              className="w-full max-w-[200px] border rounded-md px-2 py-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                            >
                              {statusOptions
                                .slice(statusOptions.indexOf(transaction.status))
                                .map((s) => (
                                  <option key={s} value={s}>
                                    {s}
                                  </option>
                                ))}
                            </select>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
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
                                  name: inputValue,
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
                              className="text-sm min-w-[200px]"
                              classNames={{
                                control: ({ isFocused }) =>
                                  `min-h-[2.25rem] rounded-md px-2 py-1 border w-full max-w-[250px] text-sm ${
                                    isFocused
                                      ? 'border-blue-500 ring-1 ring-blue-500'
                                      : 'border-gray-300 dark:border-gray-600'
                                  } bg-white text-gray-900 dark:bg-gray-700 dark:text-white`,
                                menu: () =>
                                  'bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md mt-1 z-50',
                                option: ({ isFocused, isSelected }) =>
                                  `${
                                    isSelected
                                      ? 'bg-blue-600 text-white'
                                      : isFocused
                                      ? 'bg-gray-100 dark:bg-gray-600'
                                      : ''
                                  } 
                                  cursor-pointer px-3 py-2 text-sm text-gray-900 dark:text-gray-100`,
                                singleValue: () => 'text-gray-900 dark:text-white',
                                input: () => 'text-gray-900 dark:text-white',
                                placeholder: () => 'text-gray-400 dark:text-gray-400',
                              }}
                            />
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            <div className="bg-cyan-700 text-white px-3 py-1 rounded-[20px] font-semibold border-white border-2 inline-block min-w-[120px] text-center">
                              {transaction.paymentStatus}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white max-w-[150px] truncate">
                            {transaction.modeOfPayment}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                            <textarea
                              rows={3}
                              value={notesDraft[transaction.id] ?? transaction.deliveryNotes ?? ''}
                              placeholder="Add Notes here..."
                              className="w-full min-w-[200px] px-3 py-2 border rounded-lg resize-none shadow-sm text-sm dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                          <td className="px-4 py-4 whitespace-nowrap">
                            <button
                              onClick={() => handleViewHistory(transaction.id)}
                              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors whitespace-nowrap text-sm"
                            >
                              View History
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={9}
                          className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                        >
                          No transactions found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
              <div className="text-sm text-gray-700 dark:text-gray-400">
                {total > 0 ? (
                  <span className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300 min-w-[120px] text-center">
                    Page {page} of {totalPages}
                  </span>
                ) : (
                  'No entries to show'
                )}
              </div>

              <nav className="flex items-center space-x-2">
                <button
                  onClick={() => paginate(page - 1)}
                  disabled={page <= 1}
                  className="px-3 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium
                    text-gray-500 hover:bg-gray-50
                    disabled:opacity-50 disabled:cursor-not-allowed
                    dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  Prev
                </button>

                <span className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300 min-w-[100px] text-center">
                  Page {page} of {totalPages || 1}
                </span>

                <button
                  onClick={() => paginate(page + 1)}
                  disabled={page >= totalPages}
                  className="px-3 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium
                    text-gray-500 hover:bg-gray-50
                    disabled:opacity-50 disabled:cursor-not-allowed
                    dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  Next
                </button>
              </nav>
            </div>
          </>
        )}
      </Card>

      {showHistoryModal && selectedTransactionId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-11/12 max-w-4xl max-h-[90vh] overflow-auto">
            <HistoryTransaction
              id={selectedTransactionId}
              onClose={() => setShowHistoryModal(false)}
            />
          </div>
        </div>
      )}

      {showExportModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Export Transactions
            </h2>

            <div className="space-y-4">
              <button
                onClick={() => {
                  dispatch(exportExcelRequest(undefined));
                  setShowExportModal(false);
                }}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Export All
              </button>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </div>

              <button
                onClick={() => {
                  if (startDate && endDate) {
                    dispatch(exportExcelRequest({ startDate, endDate }));
                    setShowExportModal(false);
                  }
                }}
                disabled={!startDate || !endDate}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Export by Date Range
              </button>
            </div>

            <button
              onClick={() => setShowExportModal(false)}
              className="mt-4 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transaction;
