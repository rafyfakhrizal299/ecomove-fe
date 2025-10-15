export interface Address {
  id: string;
  userId: string;
  label: string;
  address: string;
  unitStreet: string;
  pinnedLocation: string;
  contactName: string;
  contactNumber: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddressListResponse {
  status: number;
  message: string;
  results: Address[];
}
