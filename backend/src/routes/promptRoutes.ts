import express, { Request, Response, NextFunction } from 'express';
import { createPrompt, getUserPrompts, getUsersPrompts } from '../controllers/promptController';
import { validateCreatePrompt } from '../validators/promptValidator';
import validateRequest from '../middlewares/validateRequest';
import { authMiddleware } from '../middlewares/authMiddleware';
import { requireRole } from '../middlewares/roleMiddleware';
import { AppError } from '../utils/AppError';
import config from '../config/config';

const router = express.Router();

router.post('/', authMiddleware, requireRole(['user']), validateCreatePrompt, validateRequest, createPrompt);
router.get('/:userId', authMiddleware, requireRole(['admin','user']), getUserPrompts);
router.get('/users', authMiddleware, requireRole(['admin']), getUsersPrompts);


export default router;