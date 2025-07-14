import User from '../models/User';

export const createUser = async (name: string, phone: string) => {
  const existing = await User.findOne({ phone });
  if (existing) {
    throw new Error('Phone number already exists');
  }

  const newUser = await User.create({ name, phone });
  return newUser;

};

export const getAllUsers = async () => {
  return await User.find();
};
