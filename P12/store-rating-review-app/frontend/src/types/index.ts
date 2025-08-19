export interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  role: 'admin' | 'user' | 'store_owner';
}

export interface Store {
  id: number;
  name: string;
  email: string;
  address: string;
  owner_id: number;
}

export interface Rating {
  id: number;
  user_id: number;
  store_id: number;
  rating: number;
  created_at: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface DashboardStats {
  totalUsers: number;
  totalStores: number;
  totalRatings: number;
}

export interface StoreOwnerDashboard {
  average_rating: number;
  users_who_rated: User[];
}