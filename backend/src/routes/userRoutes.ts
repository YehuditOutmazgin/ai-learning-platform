// // import express from 'express';
// // import { createUser, getUsers } from '../controllers/userController';
// // import { validateCreateUser } from '../validators/userValidator';
// // import validateRequest from '../middlewares/validateRequest';
// // import { authMiddleware } from '../middlewares/authMiddleware';
// // import { requireRole } from '../middlewares/roleMiddleware';
// // import { loginUser } from '../controllers/authController';

// // const router = express.Router();

// // router.post('/signup', validateCreateUser, validateRequest, createUser);
// // router.post('/login', loginUser);

// // // 👇 רק אדמין יכול לראות את כל המשתמשים
// // router.get('/', authMiddleware, requireRole(['admin']), getUsers);

// // export default router;


// import express from 'express';
// import { createUser, getUsers } from '../controllers/userController';
// import { validateCreateUser } from '../validators/userValidator';
// import validateRequest from '../middlewares/validateRequest';
// import { authMiddleware } from '../middlewares/authMiddleware';
// import { requireRole } from '../middlewares/roleMiddleware';
// import { loginUser } from '../controllers/authController';

// const router = express.Router();

// router.post('/', validateCreateUser, validateRequest, createUser);
// router.post('/login', loginUser);

// // 👇 רק אדמין יכול לראות את כל המשתמשים
// router.get('/', authMiddleware, requireRole(['admin']), getUsers);

// export default router;
// src/routes/userRoutes.ts

import express from 'express';
import { createUser, getUsers } from '../controllers/userController';
import { validateCreateUser } from '../validators/userValidator';
import validateRequest from '../middlewares/validateRequest';
import { authMiddleware } from '../middlewares/authMiddleware';
import { requireRole } from '../middlewares/roleMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       403:
 *         description: Forbidden
 */
router.get('/', authMiddleware, requireRole(['admin']), getUsers);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created
 */
router.post('/', validateCreateUser, validateRequest, createUser);

export default router;
