import React, { useState, useMemo } from 'react';
import Card from '../../components/common/Card';

// Define the interface for a single transaction
interface TransactionData {
  booking: string;
  dateAndTime: string;
  status: 'Pending' | 'Scheduled' | 'Delivered';
  payment: string; // Assuming '150 PHP' is a string
  driver: string;
  statusOfPayment: 'Paid' | 'Automatic if payment portal';
  modeOfPayment: 'Bank' | 'Cash' | 'GCash' | 'Card';
  notes: string;
}

const Transaction: React.FC = () => {
  // Dummy data for demonstration purposes
  const [transactions, setTransactions] = useState<TransactionData[]>([
    {
      booking: 'Rafy 1',
      dateAndTime: 'Today',
      status: 'Delivered',
      payment: '150 PHP',
      driver: 'Juan Reyes',
      statusOfPayment: 'Paid',
      modeOfPayment: 'Bank',
      notes: 'Write Here',
    },
    {
      booking: 'Rafy 2',
      dateAndTime: 'Today',
      status: 'Pending',
      payment: '200 PHP',
      driver: 'Jose Dela Cruz',
      statusOfPayment: 'Paid',
      modeOfPayment: 'Cash',
      notes: 'Write Here',
    },
    {
      booking: 'Rafy 3',
      dateAndTime: 'Today',
      status: 'Pending',
      payment: '500 PHP',
      driver: 'Jose Dela Cruz',
      statusOfPayment: 'Paid',
      modeOfPayment: 'GCash',
      notes: 'Write Here',
    },
    // Add more dummy data to test pagination and search
    {
      booking: 'Rafy 4',
      dateAndTime: 'Yesterday',
      status: 'Scheduled',
      payment: '100 PHP',
      driver: 'Maria Santos',
      statusOfPayment: 'Automatic if payment portal',
      modeOfPayment: 'Card',
      notes: 'Another note',
    },
    {
      booking: 'Rafy 5',
      dateAndTime: '2 Days Ago',
      status: 'Delivered',
      payment: '300 PHP',
      driver: 'Juan Reyes',
      statusOfPayment: 'Paid',
      modeOfPayment: 'Bank',
      notes: 'Successfully delivered',
    },
    {
      booking: 'Booking A',
      dateAndTime: 'Today',
      status: 'Pending',
      payment: '75 PHP',
      driver: 'Jose Dela Cruz',
      statusOfPayment: 'Paid',
      modeOfPayment: 'Cash',
      notes: 'Urgent',
    },
    {
      booking: 'Booking B',
      dateAndTime: 'Tomorrow',
      status: 'Scheduled',
      payment: '180 PHP',
      driver: 'Maria Santos',
      statusOfPayment: 'Automatic if payment portal',
      modeOfPayment: 'GCash',
      notes: 'Morning delivery',
    },
    {
      booking: 'Rafy 6',
      dateAndTime: 'Last Week',
      status: 'Delivered',
      payment: '450 PHP',
      driver: 'Juan Reyes',
      statusOfPayment: 'Paid',
      modeOfPayment: 'Card',
      notes: 'Customer satisfied',
    },
  ]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // You can adjust this

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered and paginated data
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) =>
      Object.values(transaction).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    );
  }, [transactions, searchQuery]);

  // Calculate pagination values
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Handle dropdown changes (example for Status, you'd replicate for Driver)
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>, bookingId: string) => {
    setTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        transaction.booking === bookingId
          ? { ...transaction, status: e.target.value as 'Pending' | 'Scheduled' | 'Delivered' }
          : transaction,
      ),
    );
  };

  const handleDriverChange = (e: React.ChangeEvent<HTMLSelectElement>, bookingId: string) => {
    setTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        transaction.booking === bookingId
          ? { ...transaction, driver: e.target.value }
          : transaction,
      ),
    );
  };

  return (
    <div className="py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Admin Transaction Management
      </h1>
      <Card className="p-5 mb-6 col-span-full">
        {/* Search Input */}
        <div className="mb-6 flex justify-end">
          <input
            type="text"
            placeholder="Search transactions..."
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        {/* Transaction Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-600">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                >
                  Booking
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                >
                  Date and Time
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                >
                  Payment
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                >
                  Driver
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                >
                  Payment Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                >
                  Payment Method
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                >
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              {currentItems.length > 0 ? (
                currentItems.map((transaction) => (
                  <tr key={transaction.booking}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {transaction.booking}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {transaction.dateAndTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <select
                        className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={transaction.status}
                        onChange={(e) => handleStatusChange(e, transaction.booking)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Scheduled">Scheduled</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {transaction.payment}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <select
                        className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={transaction.driver}
                        onChange={(e) => handleDriverChange(e, transaction.booking)}
                      >
                        <option value="Jose Dela Cruz">Jose Dela Cruz</option>
                        <option value="Maria Santos">Maria Santos</option>
                        <option value="Juan Reyes">Juan Reyes</option>
                        {/* Add more drivers as needed */}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {transaction.statusOfPayment}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {transaction.modeOfPayment}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <input
                        type="text"
                        className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={transaction.notes}
                        onChange={(e) => {
                          setTransactions((prev) =>
                            prev.map((t) =>
                              t.booking === transaction.booking
                                ? { ...t, notes: e.target.value }
                                : t,
                            ),
                          );
                        }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-700 dark:text-gray-400">
            Showing {indexOfFirstItem + 1} to{' '}
            {Math.min(indexOfLastItem, filteredTransactions.length)} of{' '}
            {filteredTransactions.length} entries
          </div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`relative inline-flex items-center px-4 py-2 border border-eco-green text-sm font-medium ${
                  currentPage === i + 1
                    ? 'z-10 bg-eco-green text-white dark:bg-eco-green' // <--- Perubahan di sini
                    : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Next
            </button>
          </nav>
        </div>
      </Card>
    </div>
  );
};

export default Transaction;
