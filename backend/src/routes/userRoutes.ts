import express from 'express';
import { createUser, getUsers } from '../controllers/userController';
import { validateCreateUser } from '../validators/userValidator';
import validateRequest from '../middleware/validateRequest';


const router = express.Router();

router.post('/', validateCreateUser, validateRequest, createUser);
router.get('/', getUsers);

export default router;
