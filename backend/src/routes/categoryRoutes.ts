import express from 'express';
import { getAllCategories, getSubCategoriesByCategory } from '../controllers/categoryController';

const router = express.Router();

router.get('/', getAllCategories);
router.get('/:categoryId/subcategories', getSubCategoriesByCategory);

export default router;
