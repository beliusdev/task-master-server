import express from 'express';
import ApiError from '../errors/ApiError.js';

import auth from '../middleware/auth.js';
import todoRouter from './todoRoutes.js';
import userRouter from './userRoutes.js';

const router = express.Router();

router.get('/', (req, res) => res.send(ApiError.notFound('Page not found.')));
router.use('/user', userRouter);
router.use('/todo', auth, todoRouter);

export default router;
