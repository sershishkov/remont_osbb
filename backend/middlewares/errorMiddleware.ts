import { Request, Response, NextFunction } from 'express';
interface I_Error {
  status?: number;
  statusCode?: number;
  message?: string;
  code?: number;
  name?: string;
  error?: string;
  errors?: any;
  stack?: string;
}

export const errorHandler = (
  err: I_Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode: number = res.statusCode ? res.statusCode : 500;
  let errMessage: string = err.message!;

  //Mongoose bad ObjectId
  if (err.name === 'CastError') {
    errMessage = `Resource not found `;
    statusCode = 404;
  }

  //Mongoose duplicate field
  if (err.code === 11000) {
    errMessage = `Duplicate field value entered`;
    statusCode = 400;
  }

  //Mongoose validation error
  if (err.name === 'ValidationError') {
    errMessage = Object.values(err.errors)
      .map((val: any) => val.message)
      .join(', ');
    statusCode = 400;
  }

  res.status(statusCode);

  res.json({
    message: errMessage,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
