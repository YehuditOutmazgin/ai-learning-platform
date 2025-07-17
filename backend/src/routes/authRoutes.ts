import express from 'express';
import { getAllCategories, getSubCategoriesByCategory } from '../controllers/categoryController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { requireRole } from '../middlewares/roleMiddleware';
import { loginUser } from '../controllers/authController';
import { createUser } from '../controllers/userController';

const router = express.Router();


//log in with name and phone for user and password for admin
router.post('/login', loginUser);
router.post('/signup',createUser)


export default router;
