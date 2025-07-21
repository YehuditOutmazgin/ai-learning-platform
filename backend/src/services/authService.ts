import config from "../config/config";
import User from "../models/User";
import { AppError } from "../utils/AppError";
import { generateToken } from "../utils/jwt";

export const login = async (name: string, phone: string) => {
    try {
        if (
            name == config.adminUsername &&
            phone == config.adminPassword
        ) {
            const token = generateToken('admin_static_id', 'admin', 'admin');
            return { success: true, message: 'Admin login successful', data: { token } };
        }
        else {
            const user = await User.findOne({ name, phone });
            if (!user) throw new AppError('User not found', 404);
            const userId = user._id;
            const token = generateToken(user._id.toString(), user.name, 'user');
            console.log("token")
            return { success: true, message: 'User login successful', data: { token, userId } };
        }
    } catch (error) {
        if(error instanceof AppError)
            throw error;
        throw new AppError('Error login',500)
    }
};
