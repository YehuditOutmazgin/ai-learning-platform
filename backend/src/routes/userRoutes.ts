import express from 'express';
import { createUser, getUsers } from '../controllers/userController';
import { validateCreateUser } from '../validators/userValidator';
import validateRequest from '../middlewares/validateRequest';
import { authMiddleware } from '../middlewares/authMiddleware';
import { requireRole } from '../middlewares/roleMiddleware';

const router = express.Router();

router.post('/', validateCreateUser, validateRequest, createUser);

// 👇 רק אדמין יכול לראות את כל המשתמשים
router.get('/', authMiddleware, requireRole(['admin']), getUsers);

export default router;
