import express from 'express';
import { register, getMe, updateDetails, deleteUser } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.route('/').post(register);
userRouter.route('/:id').get(getMe);
userRouter.route('/:id').put(updateDetails);
userRouter.route('/:id').delete(deleteUser);


export default userRouter