import express from 'express';
import {
  createPrompt,
  deletePrompt,
  getUserPrompts,
  getUsersPrompts,
} from '../controllers/promptController';
import { validateCreatePrompt } from '../validators/promptValidator';
import validateRequest from '../middlewares/validateRequest';
import { authMiddleware } from '../middlewares/authMiddleware';
import { requireRole } from '../middlewares/roleMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Prompts
 *   description: Prompt management
 */

/**
 * @swagger
 * /api/prompts:
 *   post:
 *     summary: Create a new prompt
 *     tags: [Prompts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: string
 *               subCategoryId:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Prompt created
 */
router.post('/', authMiddleware, requireRole(['user']), validateCreatePrompt, validateRequest, createPrompt);

/**
 * @swagger
 * /api/prompts/get/{userId}:
 *   get:
 *     summary: Get prompts for a specific user
 *     tags: [Prompts]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Prompts retrieved
 */
router.get('/get/:userId', authMiddleware, requireRole(['admin', 'user']), getUserPrompts);

/**
 * @swagger
 * /api/prompts/users:
 *   get:
 *     summary: Get prompts of all users (admin only)
 *     tags: [Prompts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All user prompts
 */
router.get('/users', authMiddleware, requireRole(['admin']), getUsersPrompts);
// /**
//  * @swagger
//  * /api/prompts/{promptId}:
//  *   put:
//  *     summary: Update a specific prompt (send again)
//  *     tags: [Prompts]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: promptId
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: ID of the prompt to update
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               categoryId:
//  *                 type: string
//  *               subCategoryId:
//  *                 type: string
//  *               prompt:
//  *                 type: string
//  *     responses:
//  *       200:
//  *         description: Prompt updated successfully
//  *       404:
//  *         description: Prompt not found
//  *       400:
//  *         description: Invalid input
//  */
// router.put(
//   '/:promptId',
//   authMiddleware,
//   requireRole(['user', 'admin']),
//   updatePrompt
// );

/**
 * @swagger
 * /api/prompts/{promptId}:
 *   delete:
 *     summary: Delete a specific prompt
 *     tags: [Prompts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: promptId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the prompt to delete
 *     responses:
 *       200:
 *         description: Prompt deleted successfully
 *       404:
 *         description: Prompt not found
 */
router.delete(
  '/:promptId',
  authMiddleware,
  requireRole(['user', 'admin']),
  deletePrompt
);

export default router;
