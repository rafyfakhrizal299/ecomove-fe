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
  id: number;
  userId: string;
  savedAddress: boolean;
  senderAddressId: number;
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
  orderid: string | null;
  tranID: string;
  paymentStatus: string;
  modeOfPayment: string;
  status: string;
  driverId: string | null;
  createdAt: string;
  updatedAt: string;
  driver?: Driver; 
}

export interface TransactionPageResponse {
  data: Transaction[];
  total: number;
  page: number;
  pageSize: number;
}
