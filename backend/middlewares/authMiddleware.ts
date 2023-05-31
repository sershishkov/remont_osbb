import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Model__User from '../models/user/Model__User';
import {
  I_JwtPayload,
  I_GetUserAuthInfoToRequest,
} from '../interfaces/UserInterface';

export const protect = asyncHandler(
  async (
    req: I_GetUserAuthInfoToRequest,
    res: Response,
    next: NextFunction
  ) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        //Get token from header
        token = req.headers.authorization.split(' ')[1];

        //verify token
        const { id } = jwt.verify(
          token,
          process.env.JWT_SECRET!
        ) as I_JwtPayload;

        //GET user from the token

        req.user = await Model__User.findById(id).select('-password');

        next();
      } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error('Not authorized');
      }
    }

    if (!token) {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  }
);

export const authorize = (roles: string[]) => {
  return asyncHandler(
    async (
      req: I_GetUserAuthInfoToRequest,
      res: Response,
      next: NextFunction
    ) => {
      try {
        if (!roles.includes(req.user.role)) {
          res.status(403);
          throw new Error(
            `User role ${req.user.role} is unauthorized to access this route`
          );
        }
        next();
      } catch (error) {
        console.log(error);
        res.status(403);
        throw new Error('User role is unauthorized to access this route');
      }
    }
  );
};
