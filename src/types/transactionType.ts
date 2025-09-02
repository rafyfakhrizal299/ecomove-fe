export interface Transaction {
  id: number;
  userId: string;
  savedAddress: boolean;
  senderAddressId: number;
  address: string;
  contactEmail: string | null;
  contactName: string;
  contactNumber: string;
  createdAt: string;
  updatedAt: string;
  deliveryNotes: string | null;
  driverId: string | null;
  modeOfPayment: string;
  orderid: string | null;
  paymentStatus: string;
  pickupTime: string | null;
  pinnedLocation: string;
  totalDistance: string;
  totalFee: string;
  tranID: string;
  unitStreet: string;
}

export interface TransactionPageResponse {
  data: Transaction[];
  total: number;
  page: number;
  pageSize: number;
}
