import { NavigateFunction } from 'react-router-dom';

export interface I_ServerResponse<T> {
  _id?: string;
  items?: T[];
  item?: T | null;
  total?: number;
  totalPages?: number;
}

export interface I_ClientRequest {
  _id?: string;
  limit?: string;
  page?: string;
  filter?: Object;
  navigate?: NavigateFunction;
}
