import express from 'express';

import loginSchema from '../schemas/user/loginSchema.js';
import deleteSchema from '../schemas/user/deleteSchema.js';
import registerSchema from '../schemas/user/registerSchema.js';
import { deleteUser, getUser, login, register } from '../controllers/users.js';
import checkValidationErrors from '../middleware/checkValidationErrors.js';

import auth from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.get('/', auth, getUser);
userRouter.post('/login', loginSchema, checkValidationErrors, login);
userRouter.post('/register', registerSchema, checkValidationErrors, register);
userRouter.delete('/delete', auth, deleteSchema, checkValidationErrors, deleteUser);

export default userRouter;
