import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService';
import { successResponse } from '../utils/apiResponse';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, phone } = req.body;
    const user = await userService.createUser(name, phone);
    res.status(201).json(successResponse('User created successfully', user));
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(successResponse('All users fetched successfully', users));
  } catch (error) {
    next(error);
  }
};
