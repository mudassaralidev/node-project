import express from 'express';
import userRouter from './user.route.js';

const apiRouter = express.Router();

apiRouter.use('/users', userRouter);

export default apiRouter;