import React, { useRef, useState, useEffect, useCallback, type SyntheticEvent } from 'react';
import { Dropdown, type DropdownChangeEvent } from 'primereact/dropdown';
import { OverlayPanel } from 'primereact/overlaypanel';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.css';

const ADD_NEW_FROM_DROPDOWN_CLASS = "text-primary font-semibold sticky bottom-0 bg-white hover:bg-gray-50 cursor-pointer p-2";

interface Driver {
    id: string | number;
    name: string;
    licenseNumber?: string;
    phoneNumber?: string;
}

interface DriverData {
    name: string;
    licenseNumber: string;
    phoneNumber: string;
}

interface DriverDropdownProps {
    selectedDriverId: string | number | null;
    drivers: Driver[];
    onCreateDriver: (driverData: DriverData) => void;
    onChangeDriver: (driverId: string | number) => void;
    placeholder?: string;
    className?: string;
}

const DriverDropdown: React.FC<DriverDropdownProps> = ({
    selectedDriverId,
    drivers,
    onCreateDriver,
    onChangeDriver,
    placeholder = 'Select or create driver...',
    className = '',
}) => {
    const overlayRef = useRef<OverlayPanel>(null);
    const dropdownRef = useRef<Dropdown>(null);

    const [newDriverName, setNewDriverName] = useState('');
    const [newDriverLicense, setNewDriverLicense] = useState('');
    const [newDriverPhone, setNewDriverPhone] = useState('');
    const [addingDriver, setAddingDriver] = useState(false);
    const [addDriverError, setAddDriverError] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState('');

    const ADD_NEW_VALUE = '__add_new_driver__';

    // Filter drivers based on search query
    const filteredDrivers = searchQuery.trim()
        ? drivers.filter(d =>
            (d.name ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (d.licenseNumber ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (d.phoneNumber ?? '').toLowerCase().includes(searchQuery.toLowerCase())
        )
        : drivers;

    // Always show "Add new driver" option at the bottom, even during search
    const dropdownOptions = [
        ...filteredDrivers.map((driver) => ({
            label: driver.name || '(No Name)',
            value: driver.id,
            licenseNumber: driver.licenseNumber,
            phoneNumber: driver.phoneNumber,
        })),
        {
            label: '+ Add new driver',
            value: ADD_NEW_VALUE,
            licenseNumber: '',
            phoneNumber: '',
            className: ADD_NEW_FROM_DROPDOWN_CLASS,
        },
    ];

    const handleDropdownChange = (e: DropdownChangeEvent) => {
        const newValue = e.value;

        if (newValue === ADD_NEW_VALUE) {
            overlayRef.current?.show(
                e as unknown as SyntheticEvent,
                dropdownRef.current?.getElement() || e.originalEvent!.target
            );
        } else {
            onChangeDriver(newValue);
        }
    };

    const handleQuickAddDriver = async () => {
        if (!newDriverName.trim()) {
            setAddDriverError('Driver name is required');
            return;
        }

        setAddingDriver(true);
        setAddDriverError('');

        try {
            await onCreateDriver({
                name: newDriverName,
                licenseNumber: newDriverLicense || '',
                phoneNumber: newDriverPhone || '',
            });
            overlayRef.current?.hide();
            setNewDriverName('');
            setNewDriverLicense('');
            setNewDriverPhone('');
        } catch (error) {
            setAddDriverError(error instanceof Error ? error.message : 'Failed to add driver');
        } finally {
            setAddingDriver(false);
        }
    };

    const handleSearchClear = () => {
        setSearchQuery('');
    };

    const handlePanelHide = () => {
        handleSearchClear();
    };

    const itemTemplate = (option: {
        label: string;
        value: string | number;
        licenseNumber?: string;
        phoneNumber?: string;
    }) => {
        if (option.value === ADD_NEW_VALUE) {
            return (
                <span className="text-blue-600 font-semibold">
                    <i className="pi pi-plus mr-2"></i>
                    {option.label}
                </span>
            );
        }
        return (
            <div className="flex flex-col">
                <span className="font-medium text-base">{option.label || ''}</span>
                {option.licenseNumber && (
                    <span className="text-xs text-gray-500">License: {option.licenseNumber}</span>
                )}
                {option.phoneNumber && (
                    <span className="text-xs text-gray-400">Phone: {option.phoneNumber}</span>
                )}
            </div>
        );
    };

    return (
        <div className={className}>
            <Dropdown
                ref={dropdownRef}
                value={selectedDriverId}
                onChange={handleDropdownChange}
                options={dropdownOptions}
                optionLabel="label"
                optionValue="value"
                placeholder={placeholder}
                filter
                filterInputAutoFocus
                onFilter={(e: { filter: string }) => setSearchQuery(e.filter || '')}
                className="input-bordered"
                panelClassName="max-h-96 overflow-y-auto"
                itemTemplate={itemTemplate}
                onHide={handlePanelHide}
            />

            <OverlayPanel ref={overlayRef} dismissable className="p-4 w-96" showCloseIcon>
                <div className="flex flex-col gap-3">
                    <h3 className="font-semibold text-gray-700 dark:text-gray-200">Add New Driver</h3>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Driver Name <span className="text-red-600">*</span>
                        </label>
                        <input
                            type="text"
                            value={newDriverName}
                            onChange={(e) => setNewDriverName(e.target.value)}
                            placeholder="Enter driver name"
                            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                            disabled={addingDriver}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            License Number
                        </label>
                        <input
                            type="text"
                            value={newDriverLicense}
                            onChange={(e) => setNewDriverLicense(e.target.value)}
                            placeholder="Enter license number (optional)"
                            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                            disabled={addingDriver}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            value={newDriverPhone}
                            onChange={(e) => setNewDriverPhone(e.target.value)}
                            placeholder="Enter phone number (optional)"
                            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                            disabled={addingDriver}
                        />
                    </div>

                    {addDriverError && <span className="text-red-600 text-sm">{addDriverError}</span>}

                    <button
                        type="button"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={addingDriver || !newDriverName.trim()}
                        onClick={handleQuickAddDriver}
                    >
                        {addingDriver ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Adding...
                            </span>
                        ) : (
                            <>
                                <i className="pi pi-plus mr-2"></i>
                                Add Driver
                            </>
                        )}
                    </button>
                </div>
            </OverlayPanel>
        </div>
    );
};

export default DriverDropdown;
