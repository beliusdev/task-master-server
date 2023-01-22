import { body } from 'express-validator';

export const password = body('password')
  .notEmpty()
  .withMessage('Please provide a password.');

export const email = body('email')
  .isEmail()
  .withMessage('Please provide a valid email address.');

export const title = body('title')
  .isLength({ min: 3 })
  .withMessage('Title must be minimum 4 characters.');
