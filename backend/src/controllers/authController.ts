import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { generateToken } from '../utils/jwt';
import { AppError } from '../utils/AppError';
import config from '../config/config';

// התחברות של משתמש רגיל לפי phone
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, phone } = req.body;
    //check if admin
    if (
      name == config.adminUsername &&
      phone == config.adminPassword
    ) {
      const token = generateToken('admin_static_id', 'admin','admin');
      res.json({ success: true, message: 'Admin login successful', data: { token } });
    }
    // check if user
    else {
      const user = await User.findOne({ name, phone });
      if (!user) throw new AppError('User not found', 404);
      const userId = user._id;
      const token = generateToken(user._id.toString(),user.name, 'user');
      console.log("token")
      res.json({ success: true, message: 'User login successful', data: { token, userId } });
    }
  } catch (error) {
    next(error);
  }
};


