import express from 'express';
import { getUserCount, loginUser, registerUser, verifyOtp, getAllUsers, blockUnblockUser, getProfile, updateProfile } from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/verifyOtp', verifyOtp);
userRouter.get('/userCount', getUserCount);
userRouter.get('/allUsers', getAllUsers);
userRouter.patch('/block/:userId', blockUnblockUser);
userRouter.post('/profile', authMiddleware, getProfile);
userRouter.post('/updateProfile', authMiddleware, updateProfile);

export default userRouter;
