import express from 'express';
import { loginUser, registerUser, verifyOtp, } from '../controllers/userController.js';
// import isAdmin from '../middleware/isAdmin.js';


const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/verifyOtp", verifyOtp);

export default userRouter;
