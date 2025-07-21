
import express from 'express';
import {
  addCategory,
  addSubCategory,
  deleteCategory,
  deleteSubCategory,
  getAllCategories,
  getAllSubCategories,
  getSubCategoriesByCategory,
  updateCategory,
  updateSubCategory,
} from '../controllers/categoryController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { requireRole } from '../middlewares/roleMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category and Subcategory management
 */

/**
 * @swagger
 * /api/categories/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of categories
 */
router.get('/categories', authMiddleware, requireRole(['user', 'admin']), getAllCategories);

/**
 * @swagger
 * /api/categories/subcategories:
 *   get:
 *     summary: Get all subcategories
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of subcategories
 */
router.get('/subcategories', authMiddleware, requireRole(['user', 'admin']), getAllSubCategories);

/**
 * @swagger
 * /api/categories/{categoryId}/subcategories:
 *   get:
 *     summary: Get subcategories by category ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of subcategories for category
 */
router.get('/:categoryId/subcategories', authMiddleware, requireRole(['user', 'admin']), getSubCategoriesByCategory);

/**
 * @swagger
 * /api/categories/addCategory:
 *   post:
 *     summary: Add a new category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category added
 */
router.post('/addCategory', authMiddleware, requireRole(['admin']), addCategory);

/**
 * @swagger
 * /api/categories/addSubcategory:
 *   post:
 *     summary: Add a new subcategory
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               categoryId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Subcategory added
 */
router.post('/addSubcategory', authMiddleware, requireRole(['admin']), addSubCategory);

/**
 * @swagger
 * /api/categories/category/{categoryId}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category updated successfully
 */
router.put('/category/:categoryId', authMiddleware, requireRole(['admin']), updateCategory);

/**
 * @swagger
 * /api/categories/category/{categoryId}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category deleted successfully
 */
router.delete('/category/:categoryId', authMiddleware, requireRole(['admin']), deleteCategory);

/**
 * @swagger
 * /api/categories/subcategory/{subCategoryId}:
 *   put:
 *     summary: Update a subcategory by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: subCategoryId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Subcategory updated successfully
 */
router.put('/subcategory/:subCategoryId', authMiddleware, requireRole(['admin']), updateSubCategory);

/**
 * @swagger
 * /api/categories/subcategory/{subCategoryId}:
 *   delete:
 *     summary: Delete a subcategory by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: subCategoryId
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Subcategory deleted successfully
 */
router.delete('/subcategory/:subCategoryId', authMiddleware, requireRole(['admin']), deleteSubCategory);

export default router;
