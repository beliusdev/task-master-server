import express from 'express';
import ApiError from '../errors/ApiError.js';

import auth from '../middleware/auth.js';
import todoRouter from './todoRoutes.js';
import userRouter from './userRoutes.js';

const router = express.Router();

router.use('/user', userRouter);
router.use('/todo', auth, todoRouter);

export default router;
