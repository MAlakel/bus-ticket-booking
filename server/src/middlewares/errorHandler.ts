import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';


const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let { statusCode, message } = err;
  if (process.env.ENVIRONMENT === 'production') {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    // ...(process.env.ENVIRONMENT === 'development' && { stack: err.stack }),
  };

  res.status(statusCode).send(response);
};

export default errorHandler;