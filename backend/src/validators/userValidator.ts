import { body } from 'express-validator';

export const validateCreateUser = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),

    body('phone')
        .notEmpty().withMessage('Phone is required')
        .isLength({ min: 9, max: 10 })
        .isNumeric()
        .withMessage('Phone must be valid'),
];
