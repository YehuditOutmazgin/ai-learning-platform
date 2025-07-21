import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError';
import config from '../config/config';

interface AuthPayload {
  userId: string;
  role: 'user' | 'admin';
}

export interface AuthenticatedRequest extends Request {
  user?: AuthPayload;
}

export const authMiddleware = (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer '))
    throw new AppError('No token provided', 401);

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as AuthPayload;
    req.user ={
  userId: decoded.userId,
  role: decoded.role,
};
    next();
  } catch (err: any) {
  if (err.name === 'TokenExpiredError') {
    throw new AppError('Token expired', 401);
  }
  throw new AppError('Invalid token', 403);
}
};
