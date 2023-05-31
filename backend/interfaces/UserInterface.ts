import { Request } from 'express';
import { MyRequestParams } from './CommonInterfaces';

export interface I_UserAuthModel {
  name: string;
  email: string;
  role?: string;
  password?: string;
  getSignedJwtToken: () => string;
  matchPassword: (enteredPassword: string) => boolean;
}

export interface I_JwtPayload {
  id: string;
}

export interface I_GetUserAuthInfoToRequest extends Request {
  user?: any;
}

export interface I_GetUserAndParams
  extends Request<{}, {}, {}, MyRequestParams> {
  user?: any;
}
