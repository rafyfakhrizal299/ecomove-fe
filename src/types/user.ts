export interface Service {
  id: number;
  name: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  mobileNumber: string | null;
  email: string;
  provider: string | null;
  providerId: string | null;
  emailVerifiedAt: string | null;
  role: string;
  canAccessCMS: boolean;
  createdAt: string;
  updatedAt: string;
  services: Service[];
}

// Tipe baru untuk data paginasi di dalam 'results'
export interface PaginationData {
  data: User[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// UserListResponse adalah respons API lengkap, yang berisi properti 'results'
export interface UserListResponse {
  status: number;
  message: string;
  results: PaginationData; // Gunakan tipe baru di sini
}
