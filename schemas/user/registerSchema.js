import { body } from 'express-validator';
import { email, password } from '../validation.js';

const registerSchema = [
  body('username')
    .trim()
    .isLength({ min: 4 })
    .withMessage('Username must be at least 4 characters.'),
  email,
  password,
];

export default registerSchema;
