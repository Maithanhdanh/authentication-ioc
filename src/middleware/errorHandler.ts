import { AppError } from '@server/common/error';
import { logger } from '@server/config/logger';
import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

export const errorHandlerMiddleware: ErrorRequestHandler = (
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    next(error);
  }

  const appError: AppError =
    error instanceof AppError ? error : new AppError({ errorId: 'sample errorId', message: 'sample message' });
  const response = appError.toResponse();

  logger.debug(`Error`, { error });
  res.status(500).json(response);
};
