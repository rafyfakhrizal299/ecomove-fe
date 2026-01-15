import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoCloseOutline as _IoCloseOutline } from 'react-icons/io5';
import html2canvas from 'html2canvas';
import { fetchTransactionDetailRequest } from '../../slices/transactionSlice';
import { AppDispatch, RootState } from '../../store/mainStore';
import { Receiver } from '../../types/transactionType';

const IoCloseOutline = _IoCloseOutline as React.ComponentType<{ className?: string }>;

interface HistoryTransactionProps {
  id: number;
  onClose: () => void;
}

function HistoryTransaction({ id, onClose }: HistoryTransactionProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { detail, loading, error } = useSelector((state: RootState) => state.transaction);
  const [geocodedAddresses, setGeocodedAddresses] = React.useState<{ [key: string]: string }>({});
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownloadImage = async () => {
    if (!contentRef.current) return;

    try {
      // Store original styles
      const originalMaxHeight = contentRef.current.style.maxHeight;
      const originalOverflow = contentRef.current.style.overflow;

      // Temporarily remove scroll constraints to capture full content
      contentRef.current.style.maxHeight = 'none';
      contentRef.current.style.overflow = 'visible';

      // Wait a bit for the browser to reflow
      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 100);
      });

      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        windowHeight: contentRef.current.scrollHeight,
      });

      // Restore original styles
      contentRef.current.style.maxHeight = originalMaxHeight;
      contentRef.current.style.overflow = originalOverflow;

      const link = document.createElement('a');
      link.download = `transaction-${detail?.id || 'detail'}-${new Date().getTime()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error generating image:', err);
      // Restore styles in case of error
      if (contentRef.current) {
        contentRef.current.style.maxHeight = '';
        contentRef.current.style.overflow = '';
      }
    }
  };

  const changeTheMOP = (value: string) => {
    let mop = '';
    const split = value.split(', ');
    split.forEach((data, index) => {
      mop += index === split.length - 1 ? data : `${data},`;
    });
    return mop.replace(/-/g, ' ').toUpperCase();
  };

  const convertCoordinatesToAddress = async (pinnedLocation: string): Promise<string> => {
    try {
      const [lat, lng] = pinnedLocation.split(',').map((coord) => coord.trim());

      // Using Nominatim (OpenStreetMap) - free geocoding service
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
        {
          headers: {
            'User-Agent': 'EcomoveApp/1.0',
          },
        },
      );
      const data = await response.json();

      if (data && data.display_name) {
        return data.display_name;
      }
      return pinnedLocation;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error converting coordinates to address:', err);
      return pinnedLocation;
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchTransactionDetailRequest(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    const fetchAddresses = async () => {
      if (!detail) return;

      const addresses: { [key: string]: string } = {};

      // Convert pickup address if needed
      if (!detail.address && detail.pinnedLocation) {
        addresses.pickup = await convertCoordinatesToAddress(detail.pinnedLocation);
      }

      // Convert receiver addresses if needed
      if (detail.receivers) {
        const receiverPromises = detail.receivers.map(async (receiver) => {
          if (!receiver.address && receiver.pinnedLocation) {
            return {
              key: `receiver_${receiver.id}`,
              address: await convertCoordinatesToAddress(receiver.pinnedLocation),
            };
          }
          return null;
        });

        const results = await Promise.all(receiverPromises);
        results.forEach((result) => {
          if (result) {
            addresses[result.key] = result.address;
          }
        });
      }

      setGeocodedAddresses(addresses);
    };

    fetchAddresses();
  }, [detail]);

  if (error || loading) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-7xl transform transition-all duration-300">
          <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Transaction Detail
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <IoCloseOutline className="w-6 h-6" />
            </button>
          </div>
          {error && (
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <p className="text-center text-red-500 dark:text-red-400">Error: {error}</p>
            </div>
          )}
          {loading && (
            <div className="p-6 max-h-[70vh] overflow-y-auto animate-pulse">
              <div className="mb-6 space-y-2">
                <div className="px-6 py-3">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-2" />
                </div>
                <div className="px-6 py-3">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3" />
                </div>
                <div className="px-6 py-3">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/5" />
                </div>
                <div className="px-6 py-3">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
                </div>
                <div className="px-6 py-3">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3" />
                </div>
              </div>

              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-3" />

              <div className="overflow-x-auto">
                <div className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <div className="bg-gray-50 dark:bg-gray-600 p-3">
                    <div className="flex gap-4">
                      <div className="h-4 bg-gray-300 dark:bg-gray-500 rounded flex-1" />
                      <div className="h-4 bg-gray-300 dark:bg-gray-500 rounded flex-1" />
                      <div className="h-4 bg-gray-300 dark:bg-gray-500 rounded flex-1" />
                      <div className="h-4 bg-gray-300 dark:bg-gray-500 rounded flex-1" />
                      <div className="h-4 bg-gray-300 dark:bg-gray-500 rounded flex-1" />
                      <div className="h-4 bg-gray-300 dark:bg-gray-500 rounded flex-1" />
                      <div className="h-4 bg-gray-300 dark:bg-gray-500 rounded flex-1" />
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-4">
                        <div className="flex gap-4">
                          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded flex-1" />
                          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded flex-1" />
                          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded flex-1" />
                          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded flex-1" />
                          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded flex-1" />
                          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded flex-1" />
                          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded flex-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end p-5 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-7xl transform transition-all duration-300">
          <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Transaction Detail
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <IoCloseOutline className="w-6 h-6" />
            </button>
          </div>
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            <p className="text-center text-gray-500 dark:text-gray-400">No transaction found</p>
          </div>
          <div className="flex justify-end p-5 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-7xl transform transition-all duration-300">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Transaction Detail
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <IoCloseOutline className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div ref={contentRef} className="p-6 max-h-[70vh] overflow-y-auto">
          {/* Order Summary Section */}
          <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-5 border border-blue-200 dark:border-gray-600">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
              <span className="mr-2">📋</span> Order Summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Transaction ID</p>
                <p className="font-semibold text-gray-900 dark:text-white">{detail.id || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Status</p>
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  {detail.status}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Payment Status</p>
                <span
                  className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${detail.paymentStatus === 'paid'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}
                >
                  {detail.paymentStatus?.toUpperCase() || '-'}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Payment Method</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {changeTheMOP(detail.modeOfPayment)}
                </p>
              </div>
            </div>
          </div>

          {/* Pickup Information Section */}
          <div className="mb-6 bg-white dark:bg-gray-700 rounded-lg p-5 border border-gray-200 dark:border-gray-600 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
              <span className="mr-2">📍</span> Pickup Information
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Sender Name</p>
                <p className="font-semibold text-gray-900 dark:text-white">{detail.contactName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Contact Number</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {detail.contactNumber}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Email</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {detail.contactEmail || '-'}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Unit/Street</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {detail.unitStreet || '-'}
                </p>
              </div>
              <div className="lg:col-span-2">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pickup Address</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {detail.address || geocodedAddresses.pickup || '-'}
                </p>
              </div>
              {detail.address && (
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pinned Location</p>
                  <p className="font-mono text-sm text-blue-600 dark:text-blue-400">
                    {detail.pinnedLocation || '-'}
                  </p>
                </div>
              )}
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pickup Type</p>
                <p className="font-semibold text-gray-900 dark:text-white capitalize">
                  {detail.pickupType || '-'}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pickup Date</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {detail.pickupDate || '-'}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pickup Time</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {detail.pickupTime ? detail.pickupTime.split('.')[0] : '-'}
                </p>
              </div>
            </div>
          </div>

          {/* Driver & Vehicle Information Section */}
          {detail.driver && (
            <div className="mb-6 bg-white dark:bg-gray-700 rounded-lg p-5 border border-gray-200 dark:border-gray-600 shadow-sm">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                <span className="mr-2">🚴</span> Driver & Vehicle Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Driver Name</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {detail.driver.name}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Phone Number</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {detail.driver.phoneNumber}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Email</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {detail.driver.email || '-'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">License Number</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {detail.driver.licenseNumber}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Vehicle Type</p>
                  <p className="font-semibold text-gray-900 dark:text-white capitalize">
                    {detail.vehicle}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Driver Status</p>
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${detail.driver.isActive
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}
                  >
                    {detail.driver.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Delivery Metrics Section */}
          <div className="mb-6 bg-white dark:bg-gray-700 rounded-lg p-5 border border-gray-200 dark:border-gray-600 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
              <span className="mr-2">📊</span> Delivery Metrics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 dark:bg-gray-600 rounded-lg p-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Distance</p>
                <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  {detail.totalDistance
                    ? `${(parseFloat(detail.totalDistance) / 1000).toFixed(2)} km`
                    : '-'}
                </p>
              </div>
              <div className="bg-green-50 dark:bg-gray-600 rounded-lg p-4 hidden">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Fee</p>
                <p className="text-xl font-bold text-green-600 dark:text-green-400">
                  ₱{detail.totalFee || '0'}
                </p>
              </div>
              <div className="bg-purple-50 dark:bg-gray-600 rounded-lg p-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total ETA</p>
                <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
                  {detail.totalETA || '-'}
                </p>
              </div>
              <div className="bg-emerald-50 dark:bg-gray-600 rounded-lg p-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">CO2 Savings</p>
                <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                  {detail.totalCO2 ? `${detail.totalCO2.toFixed(2)}g` : '-'}
                </p>
              </div>
            </div>
          </div>

          {/* Delivery Notes Section */}
          {detail.deliveryNotes && (
            <div className="mb-6 bg-yellow-50 dark:bg-gray-700 rounded-lg p-5 border border-yellow-200 dark:border-gray-600">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2 flex items-center">
                <span className="mr-2">📝</span> Delivery Notes
              </h2>
              <p className="text-gray-700 dark:text-gray-300">{detail.deliveryNotes}</p>
            </div>
          )}

          {/* Receivers/Destinations Section */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
              <span className="mr-2">📦</span> Delivery Destinations (
              {detail.receivers?.length || 0})
            </h2>
            {detail.receivers?.length ? (
              <div className="space-y-4">
                {detail.receivers.map((r: Receiver, index: number) => (
                  <div
                    key={r.id}
                    className="bg-white dark:bg-gray-700 rounded-lg p-5 border-l-4 border-blue-500 shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-md font-bold text-gray-800 dark:text-white">
                        Destination #{index + 1}
                      </h3>
                      {r.statusCanceled && (
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                          CANCELED
                        </span>
                      )}
                    </div>

                    {/* Receiver Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-200 dark:border-gray-600">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          Receiver Name
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {r.contactName}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          Contact Number
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {r.contactNumber}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Email</p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {r.contactEmail || '-'}
                        </p>
                      </div>
                    </div>

                    {/* Delivery Address */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-200 dark:border-gray-600">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Unit/Street</p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {r.unitStreet || '-'}
                        </p>
                      </div>
                      <div className="lg:col-span-1">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          Delivery Address
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {r.address || geocodedAddresses[`receiver_${r.id}`] || '-'}
                        </p>
                      </div>
                      {r.address && (
                        <div className="lg:col-span-2">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            Pinned Location (Lat, Long)
                          </p>
                          <p className="font-mono text-sm text-blue-600 dark:text-blue-400">
                            {r.pinnedLocation || '-'}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Package Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 pb-4 border-b border-gray-200 dark:border-gray-600">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          Delivery Type
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-white capitalize">
                          {r.deliveryType?.replace(/-/g, ' ')}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          Package Type
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-white capitalize">
                          {r.packageType}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Item Type</p>
                        <p className="font-semibold text-gray-900 dark:text-white capitalize">
                          {r.itemType || '-'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Weight</p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {r.weight ? `${r.weight} kg` : '-'}
                        </p>
                      </div>
                    </div>

                    {/* Delivery Options */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 pb-4 border-b border-gray-200 dark:border-gray-600">
                      <div className="flex items-center">
                        <span className={`text-xl mr-2 ${r.cod ? '' : 'opacity-30'}`}>💵</span>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">COD</p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {r.cod ? 'Yes' : 'No'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className={`text-xl mr-2 ${r.bringPouch ? '' : 'opacity-30'}`}>
                          👜
                        </span>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Bring Pouch</p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {r.bringPouch ? 'Yes' : 'No'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className={`text-xl mr-2 ${r.itemProtection ? '' : 'opacity-30'}`}>
                          🛡️
                        </span>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Protection</p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {r.itemProtection ? 'Yes' : 'No'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xl mr-2">🚲</span>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">eVehicle</p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white capitalize">
                            {r.eVehicle || '-'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Payment & Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 pb-4 border-b border-gray-200 dark:border-gray-600">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          Payment Method
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {changeTheMOP(r.modeOfPayment)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          Delivery Fee
                        </p>
                        <p className="font-semibold text-green-600 dark:text-green-400">
                          ₱{r.fee || '0'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Distance</p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {r.distance ? `${(parseFloat(r.distance) / 1000).toFixed(2)} km` : '-'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">ETA</p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {r.etaFormatted || (r.eta ? String(r.eta).split('.')[0] : '-')}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">CO2 Savings</p>
                        <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                          {r.co ? `${parseFloat(r.co).toFixed(2)}g` : '-'}
                        </p>
                      </div>
                    </div>

                    {/* Delivery Notes */}
                    {r.deliveryNotes && (
                      <div className="bg-yellow-50 dark:bg-gray-600 rounded p-3">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          📝 Delivery Notes
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {r.deliveryNotes}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">No delivery destinations found</p>
              </div>
            )}
          </div>

          {/* Timestamps Section */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-gray-500 dark:text-gray-400 mb-1">Created At</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {detail.createdAt ? new Date(detail.createdAt).toLocaleString() : '-'}
                </p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 mb-1">Last Updated</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {detail.updatedAt ? new Date(detail.updatedAt).toLocaleString() : '-'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end gap-3 p-5 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={handleDownloadImage}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default HistoryTransaction;
