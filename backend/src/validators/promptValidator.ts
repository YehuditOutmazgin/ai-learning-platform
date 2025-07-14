import { body } from 'express-validator';

export const validateCreatePrompt = [
  body('userId')
    .notEmpty().withMessage('userId is required')
    .isMongoId().withMessage('userId must be a valid MongoDB ObjectId'),

  body('categoryId')
    .notEmpty().withMessage('categoryId is required')
    .isMongoId().withMessage('categoryId must be a valid MongoDB ObjectId'),

  body('subCategoryId')
    .notEmpty().withMessage('subCategoryId is required')
    .isMongoId().withMessage('subCategoryId must be a valid MongoDB ObjectId'),

  body('prompt')
    .notEmpty().withMessage('prompt is required')
    .isLength({ min: 3 }).withMessage('prompt must be at least 3 characters'),
];
