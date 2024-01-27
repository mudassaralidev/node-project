import express from 'express';
import { register, getMe, updateDetails, deleteUser, login, logout } from '../controllers/user.controller.js';
import auth from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.route('/').post(register);
userRouter.route('/login').post(login);
userRouter.route('/logout').get(logout);
userRouter.route('/').get(auth, getMe);
userRouter.route('/').put(auth, updateDetails);
userRouter.route('/').delete(auth, deleteUser);


export default userRouter