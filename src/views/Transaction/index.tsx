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
import HistoryTransaction from './historyTransaction';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Chip } from 'primereact/chip';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.css';
import { toFormattedDate } from '../../utils/date.utils';
import DriverDropdown from './components/DriverDropdown';

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
  'Cancelled',
];

const Transaction: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: transactions,
    total,
    page,
    loading,
    totalPages,
    pageSize,
    drivers = [],
  } = useSelector((state: RootState) => state.transaction);

  const [searchQuery, setSearchQuery] = useState('');
  const [notesDraft, setNotesDraft] = useState<{ [id: number]: string }>({});
  const isSidebarOpen = useSelector((state: RootState) => state.ui.isSidebarOpen);
  const [showExportModal, setShowExportModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<number | null>(null);
  const safePage = Number.isFinite(page) && page > 0 ? page : 1;
  const safeTotalPages = Number.isFinite(totalPages) && totalPages > 0 ? totalPages : 1;
  const safeTotal = Number.isFinite(Number(total)) ? Number(total) : 0;
  const safePageSize = Number.isFinite(pageSize) && pageSize > 0 ? pageSize : 10;

  const start = safeTotal > 0 ? (safePage - 1) * safePageSize + 1 : 0;
  const end = safeTotal > 0 ? Math.min(safePage * safePageSize, safeTotal) : 0;

  const changeTheMOP = (value: string) => {
    let mop = '';
    let split = value.split(',')
    split.map((data, index) => {
      mop += index === split.length - 1 ? data + ',' : data
    })
    return mop.replace(',', ' ').toUpperCase()
  }

  useEffect(() => {
    dispatch(fetchTransactionsRequest({ page: 1, limit: 10, search: '' }));
    dispatch(fetchDriversRequest());
  }, [dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    dispatch(fetchTransactionsRequest({ page: 1, limit: 10, search: e.target.value }));
  };


  const paginate = (newPage: number) => {
    // Validate the page number
    if (
      !Number.isFinite(newPage) ||
      newPage < 1 ||
      newPage > safeTotalPages
    ) {
      return;
    }

    // Only dispatch if the page actually changed
    if (newPage !== safePage) {
      dispatch(fetchTransactionsRequest({
        page: newPage,
        limit: safePageSize,
        search: searchQuery,
      }));
    }
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
        <DataTable
          value={transactions}
          paginator
          lazy
          rows={safePageSize}
          totalRecords={safeTotal}
          first={(safePage - 1) * safePageSize}
          onPage={(e) => {
            if (e.page !== undefined) {
              paginate(e.page + 1);
            }
          }}
          loading={loading}
          scrollable
          className="w-full"
          emptyMessage="No transactions found."
        >
          <Column field="id" header="ID" style={{ minWidth: '80px' }} />
          <Column field="tranID" header="Booking" style={{ minWidth: '100px' }} />
          <Column
            field="createdAt"
            header="Date and Time"
            body={(rowData) =>
              rowData.createdAt ? toFormattedDate(new Date(rowData.createdAt)) : '-'
            }
            style={{ minWidth: '180px' }}
          />
          <Column
            header="Status"
            body={(rowData) => (
              <Dropdown
                value={rowData.status}
                onChange={(e) => handleStatusChange(rowData.id, e.value)}
                options={statusOptions}
                placeholder="Select status"
                filter
                filterInputAutoFocus
                className="w-full min-w-[200px] max-w-[250px] text-sm h-12
                    px-4
                    rounded-md
                    border
                    border-gray-300
                    bg-white
                    text-gray-900
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    focus:border-blue-500
                "
                panelClassName="max-h-96 overflow-y-auto"
              />
            )}
            style={{ minWidth: '200px' }}
          />
          <Column
            header="Driver"
            body={(rowData) => (
              <DriverDropdown
                selectedDriverId={rowData.driverId || null}
                drivers={drivers}
                onCreateDriver={(driverData: { name: string; licenseNumber: string; phoneNumber: string }) => {
                  const payload = {
                    name: driverData.name,
                    licenseNumber: driverData.licenseNumber,
                    phoneNumber: driverData.phoneNumber,
                    transactionId: rowData.id,
                  };
                  dispatch(createDriverRequest(payload));
                }}
                onChangeDriver={(driverId: string | number) => {
                  dispatch(
                    updateTransactionRequest({
                      id: rowData.id,
                      updates: { driverId: String(driverId) },
                    }),
                  );
                }}
              />
            )}
            style={{ minWidth: '250px' }}
          />
          <Column
            field="paymentStatus"
            header="Payment Status"
            body={(rowData) => (
              <div className="bg-cyan-700 text-white px-3 py-1 rounded-[20px] font-semibold border-white border-2 inline-block min-w-[120px] text-center">
                {rowData.paymentStatus}
              </div>
            )}
            style={{ minWidth: '150px' }}
          />
          <Column
            header="Notes"
            body={(rowData) => (
              <textarea
                rows={3}
                value={notesDraft[rowData.id] ?? rowData.deliveryNotes ?? ''}
                placeholder="Add Notes here..."
                className="w-full min-w-[200px] px-3 py-2 border rounded-lg resize-none shadow-sm text-sm dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => handleNotesChange(rowData.id, e.target.value)}
                onBlur={() => handleNotesSave(rowData.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleNotesSave(rowData.id);
                  }
                }}
              />
            )}
            style={{ minWidth: '250px' }}
          />
          <Column
            header="Actions"
            body={(rowData) => (
              <button
                onClick={() => handleViewHistory(rowData.id)}
                className="px-4 py-2 bg-[#5D8F3D] text-white rounded-md hover:bg-green-700 transition-colors whitespace-nowrap text-sm"
              >
                Detail
              </button>
            )}
            style={{ minWidth: '140px' }}
          />
        </DataTable>
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
