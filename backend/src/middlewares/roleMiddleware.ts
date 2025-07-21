import { Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { AuthenticatedRequest } from './authMiddleware';

export const requireRole = (roles: ('user' | 'admin')[]) => {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
    const role = req.user?.role;
    if (!role || !roles.includes(role)) {
      throw new AppError('Access denied', 403);
    }
    next();
  };
};
