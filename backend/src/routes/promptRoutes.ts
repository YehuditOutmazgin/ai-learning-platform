import express from 'express';
import { createPrompt, getUserPrompts } from '../controllers/promptController';
import { validateCreatePrompt } from '../validators/promptValidator';
import validateRequest from '../middleware/validateRequest';


const router = express.Router();

router.post('/', validateCreatePrompt, validateRequest, createPrompt);
router.get('/:userId', getUserPrompts);

export default router;
