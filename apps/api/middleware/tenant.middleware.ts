// check badge apakah tenant

import { Request, Response, NextFunction } from 'express';
import { ResponseError } from '@/error/response.error';

export const tenantMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user;

  if (!user || user.role !== 'TENANT') {
    return next(
      new ResponseError(403, 'Forbidden: Akses ditolak. Hanya untuk tenant.'),
    );
  }

  next();
};
