export interface Driver {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  licenseNumber: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: number | string;
  userId: string;
  savedAddress: boolean;
  addAddress: boolean;
  senderAddressId: number | null;
  address: string;
  unitStreet: string;
  pinnedLocation: string;
  contactName: string;
  contactNumber: string;
  contactEmail: string | null;
  totalDistance: string;
  totalFee: string;
  deliveryNotes: string | null;
  pickupTime: string | null;
  pickupDate: string | null;
  pickupType: string | null;
  orderid: string | null;
  tranID: string | null;
  paymentStatus: string;
  modeOfPayment: string;
  status: string;
  driverId: string | null;
  vehicle: string;
  totalETA: string;
  totalCO2: number;
  createdAt: string;
  updatedAt: string;
  driver?: Driver;
  receivers?: Receiver[];
}

export interface TransactionPageResponse {
  data: Transaction[];
  total: number;
  page: number;
  pageSize: number;
}

export interface Receiver {
  id: number;
  transactionId: number | string;
  savedAddress: boolean;
  addAddress: boolean;
  receiverAddressId: number | null;
  address: string;
  unitStreet: string;
  pinnedLocation: string;
  contactName: string;
  contactNumber: string;
  contactEmail: string | null;
  deliveryType: string;
  eVehicle: string;
  packageSize?: string;
  distance: string;
  modeOfPayment: string;
  fee: string;
  bringPouch: boolean;
  itemType: string;
  packageType: string;
  cod: boolean;
  itemProtection: boolean;
  deliveryNotes: string | null;
  weight: string;
  co: string;
  eta: number;
  etaFormatted: string;
  statusCanceled: boolean;
  createdAt: string;
  updatedAt: string;
}
