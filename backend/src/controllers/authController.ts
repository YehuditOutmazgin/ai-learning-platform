import { Request, Response, NextFunction } from 'express';
import { login } from '../services/authService';

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, phone } = req.body;
    const response=await login(name,phone)
      res.json(response);
  } catch (error) {
    next(error);
  }
};


