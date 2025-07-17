import express from 'express';
import { addCategory, addSubCategory, getAllCategories, getAllSubCategories, getSubCategoriesByCategory } from '../controllers/categoryController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { requireRole } from '../middlewares/roleMiddleware';

const router = express.Router();

router.get('/categories', authMiddleware, requireRole(['user', 'admin']), getAllCategories);
router.get('/subcategories', authMiddleware, requireRole(['user', 'admin']), getAllSubCategories)
router.get('/:categoryId/subcategories', authMiddleware, requireRole(['user', 'admin']), getSubCategoriesByCategory);
router.post('/addSubcategory', authMiddleware, requireRole(['admin']), addSubCategory);
router.post('/addCategory', authMiddleware, requireRole(['admin']), addCategory);
export default router;
