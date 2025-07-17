import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import config from './config/config';
import { errorHandler } from './middlewares/errorHandler';
import userRoutes from './routes/userRoutes';
import categoryRoutes from './routes/categoryRoutes';
import promptRoutes from './routes/promptRoutes';
import { authMiddleware } from './middlewares/authMiddleware';
import  router from './routes/authRoutes';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (_req, res) => res.send('API is running'));

app.use('/api/users',authMiddleware, userRoutes);
app.use('/api/categories',authMiddleware, categoryRoutes);
app.use('/api/prompts',authMiddleware, promptRoutes);
app.use('/api/auth'/*,authMiddleware*/, router);

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`✅ Server running at http://localhost:${config.port}`);
});
