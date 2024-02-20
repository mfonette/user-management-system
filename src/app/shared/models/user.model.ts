export interface User {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: userData[];
}

export interface CreateUserRequest {
  name: string;
  job: string;
}

export interface CreateUserResponse {
  id: string;
  name: string;
  job: string;
  createdAt: string; // Assuming the response includes these
}

export interface userData{
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}