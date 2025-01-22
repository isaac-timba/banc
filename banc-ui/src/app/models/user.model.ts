export interface User {
  id?: number;
  email: string;
  password: string;
  role?: UserRole
}

export enum UserRole {
  Admin = 'Admin',
  Customer = 'Customer',
  Teller = 'Teller'
}
