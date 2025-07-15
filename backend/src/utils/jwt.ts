import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export const generateToken = (userId: string, role: 'user' | 'admin') => {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '2h' });
};

export const verifyToken = (token: string): { userId: string; role: string } => {
  return jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
};
