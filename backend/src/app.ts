import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/errorHandler';
import userRoutes from './routes/userRoutes';
import categoryRoutes from './routes/categoryRoutes';
import promptRoutes from './routes/promptRoutes';
import authRoutes from './routes/authRoutes';
import { setupSwagger } from './config/swagger';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
setupSwagger(app);

app.get('/', (_req, res) => res.send('API is running'));

app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/prompts', promptRoutes);
app.use('/api/auth', authRoutes);
app.use(errorHandler);

export default app;
