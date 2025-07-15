import express from 'express';
import { getAllCategories, getSubCategoriesByCategory } from '../controllers/categoryController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { requireRole } from '../middlewares/roleMiddleware';

const router = express.Router();

router.get('/', authMiddleware, requireRole(['user', 'admin']), getAllCategories);
router.get('/:categoryId/subcategories', authMiddleware, requireRole(['user', 'admin']), getSubCategoriesByCategory);

export default router;
