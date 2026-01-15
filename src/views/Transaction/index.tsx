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
import { MultiSelect } from 'primereact/multiselect';
import { Chip } from 'primereact/chip';
import { InputIcon } from 'primereact/inputicon';
import { IconField } from 'primereact/iconfield';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.css';
import { toFormattedDate } from '../../utils/date.utils';
import { getLocalStorage, setLocalStorage } from '../../utils/localStorage.utils';
import DriverDropdown from './components/DriverDropdown';
import Input from 'react-select/dist/declarations/src/components/Input';
import { InputText } from 'primereact/inputtext';

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

const paymentStatusOptions = ['pending', 'paid'];

const paymentMethodOptions = ['cash-on-delivery', 'gcash'];

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
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(() => {
    const saved = getLocalStorage('transactionStatusFilter');
    return saved ? JSON.parse(saved) : statusOptions;
  });
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchTransactionsRequest({ page: 1, limit: 10, search: '', statuses: selectedStatuses }));
    dispatch(fetchDriversRequest());
  }, [dispatch, selectedStatuses]);
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    dispatch(fetchTransactionsRequest({ page: 1, limit: 10, search: e.target.value, statuses: selectedStatuses }));
  };

  const handleStatusFilterChange = (e: any) => {
    const newStatuses = e.value;
    setSelectedStatuses(newStatuses);
    setLocalStorage('transactionStatusFilter', JSON.stringify(newStatuses));
    dispatch(fetchTransactionsRequest({
      page: 1,
      limit: 10,
      search: searchQuery,
      statuses: newStatuses
    }));
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
        statuses: selectedStatuses,
      }));
    }
  };

  const handleStatusChange = (id: number, status: string) => {
    dispatch(updateTransactionRequest({ id, updates: { status } }));
  };

  const handlePaymentStatusChange = (id: number, paymentStatus: string) => {
    dispatch(updateTransactionRequest({ id, updates: { paymentStatus } }));
  };

  const handlePaymentMethodChange = (id: number, modeOfPayment: string) => {
    dispatch(updateTransactionRequest({ id, updates: { modeOfPayment } }));
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
    <div className=" w-full max-w-full relative">
      <h1 className="font-bold text-gray-900 dark:text-white mb-6">
        Admin Transaction Management
      </h1>
      <Card className="p-5 mb-6 w-full max-w-[85vw] overflow-auto">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <IconField iconPosition="right" className="flex-1 sm:flex-none">
              <InputIcon className="pi pi-search" />
              <InputText
                type="search"
                placeholder="Search transactions..."
                className="input-bordered "
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </IconField>
            <MultiSelect
              value={selectedStatuses}
              onChange={handleStatusFilterChange}
              options={statusOptions}
              placeholder="Filter by Status"
              className="input-bordered"
            />
          </div>
          <button
            onClick={() => setShowExportModal(true)}
            className="w-full sm:w-auto px-4 py-2 bg-green-900 text-white rounded-md hover:bg-green-700 transition-colors whitespace-nowrap flex items-center justify-center gap-2"
          >
            <i className="pi pi-download" />
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
          size='small'
          stripedRows
          emptyMessage={
            <div className="flex flex-col items-center justify-center p-6 text-gray-500">
              <span>No transactions found.</span>
            </div>
          }
        >
          <Column
            header="Transaction Info"
            body={(rowData) => {
              const customerName = rowData.user
                ? `${rowData.user.firstName} ${rowData.user.lastName}`.trim()
                : rowData.contactName || '-';
              return (
                <div className="flex flex-col gap-1 py-1">
                  <div className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                    #{rowData.id}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {rowData.createdAt ? toFormattedDate(new Date(rowData.createdAt)) : '-'}
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    {rowData.vehicle || '-'}
                  </div>
                  <div className="text-sm font-bold text-gray-500 dark:text-gray-400">
                    {customerName}
                  </div>
                </div>
              );
            }}
            style={{ minWidth: '200px' }}
          />
          <Column
            header="Booking Status"
            body={(rowData) => (
              <Dropdown
                value={rowData.status}
                onChange={(e) => handleStatusChange(rowData.id, e.value)}
                options={statusOptions}
                placeholder="Select status"
                filter
                filterInputAutoFocus
                className="input-bordered "
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
              <Dropdown
                value={rowData.paymentStatus}
                onChange={(e) => handlePaymentStatusChange(rowData.id, e.value)}
                options={paymentStatusOptions}
                placeholder="Select payment status"
                className="input-bordered"
                valueTemplate={(option) => {
                  const bgColor = option === 'paid' ? 'bg-green-200' : 'bg-orange-200';
                  return (
                    <div className={`flex gap-2  items-center uppercase text-xs mt-1`}>
                      <div className={`${bgColor} h-3 w-3 rounded-full my-auto`}></div>
                      {option}
                    </div>
                  );
                }}
                itemTemplate={(option) => {
                  const bgColor = option === 'paid' ? 'bg-green-200' : 'bg-orange-200';
                  return (
                    <div className={`flex gap-2 items-center uppercase text-xs`}>
                      <div className={`${bgColor} h-3 w-3 rounded-full my-auto`}></div>
                      {option}
                    </div>
                  );
                }}
              />
            )}
            style={{ minWidth: '150px' }}
          />
          <Column
            field="modeOfPayment"
            header="Payment Method"
            body={(rowData) => (
              <Dropdown
                value={rowData.modeOfPayment}
                onChange={(e) => handlePaymentMethodChange(rowData.id, e.value)}
                options={paymentMethodOptions}
                placeholder="Select payment method"
                className="input-bordered"
                valueTemplate={(option) => {
                  const bgColor = option === 'gcash' ? 'bg-blue-200' : 'bg-gray-200';
                  const displayText = option === 'cash-on-delivery' ? 'COD' : 'GCash';
                  return (
                    <div className={`flex gap-2 items-center uppercase text-xs mt-1`}>
                      <div className={`${bgColor} h-3 w-3 rounded-full my-auto`}></div>
                      {displayText}
                    </div>
                  );
                }}
                itemTemplate={(option) => {
                  const bgColor = option === 'gcash' ? 'bg-blue-200' : 'bg-gray-200';
                  const displayText = option === 'cash-on-delivery' ? 'COD' : 'GCash';
                  return (
                    <div className={`flex gap-2 items-center uppercase text-xs`}>
                      <div className={`${bgColor} h-3 w-3 rounded-full my-auto`}></div>
                      {displayText}
                    </div>
                  );
                }}
              />
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
              <div className='px-4'>
                <button
                  onClick={() => handleViewHistory(rowData.id)}
                  className="px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-700 transition-colors whitespace-nowrap text-sm"
                >
                  Detail
                </button>
              </div>
            )}
            frozen
            className='sticky right-0 bg-white'
            alignFrozen="right"
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
