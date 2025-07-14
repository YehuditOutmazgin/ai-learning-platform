import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import config from './config/config';
import { errorHandler } from './middleware/errorHandler';
import userRoutes from './routes/userRoutes';
import categoryRoutes from './routes/categoryRoutes';
import promptRoutes from './routes/promptRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (_req, res) => res.send('API is running'));

app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/prompts', promptRoutes);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`✅ Server running at http://localhost:${config.port}`);
});
