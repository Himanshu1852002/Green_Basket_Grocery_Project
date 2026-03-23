import express from 'express';
import { getUserCount, loginUser, registerUser, verifyOtp, getAllUsers, blockUnblockUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/verifyOtp', verifyOtp);
userRouter.get('/userCount', getUserCount);
userRouter.get('/allUsers', getAllUsers);
userRouter.patch('/block/:userId', blockUnblockUser);

export default userRouter;
