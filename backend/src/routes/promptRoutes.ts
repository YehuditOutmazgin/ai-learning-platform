// import express, { Request, Response, NextFunction } from 'express';
// import { createPrompt, getUserPrompts, getUsersPrompts } from '../controllers/promptController';
// import { validateCreatePrompt } from '../validators/promptValidator';
// import validateRequest from '../middlewares/validateRequest';
// import { authMiddleware } from '../middlewares/authMiddleware';
// import { requireRole } from '../middlewares/roleMiddleware';
// import { AppError } from '../utils/AppError';
// import config from '../config/config';

// const router = express.Router();

// router.post('/', authMiddleware, requireRole(['user']), validateCreatePrompt, validateRequest, createPrompt);
// router.get('/:userId', authMiddleware, requireRole(['admin','user']), getUserPrompts);
// router.get('/users', authMiddleware, requireRole(['admin']), getUsersPrompts);


// export default router;// src/routes/promptRoutes.ts

import express from 'express';
import {
  createPrompt,
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

export default router;
