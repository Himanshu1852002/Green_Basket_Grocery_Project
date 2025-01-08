import express from 'express';
import { loginUser, registerUser, verifyOtp, } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/verifyOtp", verifyOtp);

export default userRouter;
