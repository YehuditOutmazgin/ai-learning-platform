import config from '../config/config';
import User from '../models/User';
import { AppError } from '../utils/AppError';
import { isValidMongoId } from './validationService';

export const createUser = async (name: string, phone: string) => {
  if (!name || !phone ) {
    throw new AppError('Name and phone are required', 410);
  }
  if(name.length<2 )
    throw new AppError("Name is too short");
  if( phone.length<9)
    throw new AppError("Phone is invalis")
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

export const deleteUser = async (userId: string) => {
  if (!isValidMongoId(userId))
    throw new AppError('Invalid user ID', 400);
  await User.deleteOne({ _id: userId });
}
export const updateUser = async (userId: string, newName: string, newPhone: string) => {
  if (!isValidMongoId(userId))
    throw new AppError('Invalid user ID', 400);

  if (!newName && !newPhone)
    throw new AppError('No update fields provided', 400);

  if (newPhone && newPhone.length < 9)
    throw new AppError('Phone number must be at least 9 digits', 400);

  const updateData: Partial<{ name: string; phone: string }> = {};
  if (newName) updateData.name = newName;
  if (newPhone) updateData.phone = newPhone;

  await User.updateOne({ _id: userId }, { $set: updateData });
};
