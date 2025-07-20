import config from '../config/config';
import User from '../models/User';
import { AppError } from '../utils/AppError';

export const createUser = async (name: string, phone: string) => {
  if (!name || !phone) {
    throw new AppError('Name and phone are required', 410);
  }
  const existing = await User.findOne({ phone });
  if (existing || phone == config.adminPassword
  ) {
    throw new AppError('Phone number already exists', 409);
  }
  const newUser = await User.create({ name, phone });
  return newUser;
};

export const getAllUsers = async () => {
  return await User.find();
};
