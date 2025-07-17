// import express from 'express';
// import { createUser, getUsers } from '../controllers/userController';
// import { validateCreateUser } from '../validators/userValidator';
// import validateRequest from '../middlewares/validateRequest';
// import { authMiddleware } from '../middlewares/authMiddleware';
// import { requireRole } from '../middlewares/roleMiddleware';
// import { loginUser } from '../controllers/authController';

// const router = express.Router();

// router.post('/signup', validateCreateUser, validateRequest, createUser);
// router.post('/login', loginUser);

// // 👇 רק אדמין יכול לראות את כל המשתמשים
// router.get('/', authMiddleware, requireRole(['admin']), getUsers);

// export default router;


import express from 'express';
import { createUser, getUsers } from '../controllers/userController';
import { validateCreateUser } from '../validators/userValidator';
import validateRequest from '../middlewares/validateRequest';
import { authMiddleware } from '../middlewares/authMiddleware';
import { requireRole } from '../middlewares/roleMiddleware';
import { loginUser } from '../controllers/authController';

const router = express.Router();

router.post('/', validateCreateUser, validateRequest, createUser);
router.post('/login', loginUser);

// 👇 רק אדמין יכול לראות את כל המשתמשים
router.get('/', authMiddleware, requireRole(['admin']), getUsers);

export default router;
