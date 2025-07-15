import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { generateToken } from '../utils/jwt';
import { AppError } from '../utils/AppError';
import config from '../config/config';

// התחברות של משתמש רגיל לפי phone
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { phone } = req.body;
    const user = await User.findOne({ phone });
    if (!user) throw new AppError('User not found', 404);

    const token = generateToken(user._id.toString(), 'user'); // 👈 תמיד role = user
    res.json({ success: true, message: 'User login successful', data: { token } });
  } catch (error) {
    next(error);
  }
};

// התחברות של אדמין לפי שם משתמש וסיסמה מה־.env
export const loginAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    if (
      username !== config.adminUsername ||
      password !== config.adminPassword
    ) {
      throw new AppError('Invalid admin credentials', 401);
    }

    const token = generateToken('admin_static_id', 'admin'); // 👈 משתמש קבוע
    res.json({ success: true, message: 'Admin login successful', data: { token } });
  } catch (error) {
    next(error);
  }
};
