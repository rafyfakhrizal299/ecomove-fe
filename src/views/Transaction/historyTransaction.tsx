import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchTransactionDetailRequest } from '../../slices/transactionSlice';
import { AppDispatch, RootState } from '../../store/mainStore';
import { Receiver } from '../../types/transactionType';
import { IoCloseOutline as _IoCloseOutline } from 'react-icons/io5';

const IoCloseOutline = _IoCloseOutline as React.ComponentType<{ className?: string }>;

interface HistoryTransactionProps {
  id: number;
  onClose: () => void;
}

const HistoryTransaction: React.FC<HistoryTransactionProps> = ({ id, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { detail, loading, error } = useSelector((state: RootState) => state.transaction);

  const changeTheMOP = (value: string) =>{
    let mop = '';
    let split = value.split(', ')
    split.map((data, index) => {
      mop += index === split.length - 1 ? data : data + ',' 
    })
    return mop.replace('-', ' ').toUpperCase()
  } 


  useEffect(() => {
    if (id) {
      dispatch(fetchTransactionDetailRequest(id));
    }
  }, [id, dispatch]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-7xl transform transition-all duration-300">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Transaction Detail
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <IoCloseOutline className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {loading ? (
            <p className="text-center text-gray-500 dark:text-gray-400">Loading transaction...</p>
          ) : error ? (
            <p className="text-center text-red-500 dark:text-red-400">Error: {error}</p>
          ) : detail ? (
            <>
              <div className="mb-6 space-y-2">
                <p className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                  <strong>Booking ID:</strong> {detail.tranID ?? '-'}
                </p>
                <p className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                  <strong>Status:</strong>{' '}
                  <span className="px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {detail.status}
                  </span>
                </p>
                <p className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                  <strong>Sender:</strong> {detail.contactName} ({detail.contactNumber})
                </p>
                <p className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                  <strong>Address:</strong> {detail.address}
                </p>
                
                <p className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                  <strong>Payment Method:</strong> {changeTheMOP(detail.modeOfPayment)}
                </p>
              </div>

              <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
                Receivers
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-600">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                        Address
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                        Delivery Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                        Package
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                        Payment
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {detail.receivers?.length ? (
                      detail.receivers.map((r: Receiver) => (
                        <tr
                          key={r.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                        >
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                            {r.contactName}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                            {r.address}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                            {r.contactNumber}
                            <br />
                            {r.contactEmail}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                            {r.deliveryType}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                            {r.packageType}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                            {changeTheMOP(r.modeOfPayment)}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                            {r.deliveryNotes}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                        >
                          No receivers found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">No transaction found</p>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end p-5 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryTransaction;
