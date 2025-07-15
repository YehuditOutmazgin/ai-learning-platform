import express from 'express';
import { createPrompt, getUserPrompts } from '../controllers/promptController';
import { validateCreatePrompt } from '../validators/promptValidator';
import validateRequest from '../middlewares/validateRequest';
import { authMiddleware } from '../middlewares/authMiddleware';
import { requireRole } from '../middlewares/roleMiddleware';

const router = express.Router();

router.post('/', authMiddleware, requireRole(['user']), validateCreatePrompt, validateRequest, createPrompt);
router.get('/:userId', authMiddleware, requireRole(['user']), getUserPrompts);

export default router;
