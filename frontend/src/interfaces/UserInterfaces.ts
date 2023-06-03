import { I_ClientRequest } from './CommonInterfaces';

export interface I_AuthRequest extends I_ClientRequest {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  currentPassword?: string;
  newPassword?: string;
}

export interface I_AuthResponse {
  _id: string;
  name: string;
  email: string;
  role: string;
}
