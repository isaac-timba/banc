export interface User {
  id?: number;
  email: string;
  password: string;
  role?: UserRole
}

export interface LoggedInUser {
  id?: string;
  email: string;
  accessToken: string;
  tokenExpiration: number;
}

export enum UserRole {
  Admin = 'Admin',
  Customer = 'Customer',
  Teller = 'Teller'
}
