import express from 'express';
import { getUserCount, loginUser, registerUser, verifyOtp, getAllUsers, blockUnblockUser, getProfile, updateProfile, updateAvatar, uploadAvatar, changePassword, deleteAccount } from '../controllers/userController.js';
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
userRouter.post('/updateAvatar', authMiddleware, uploadAvatar.single('avatar'), updateAvatar);
userRouter.post('/changePassword', authMiddleware, changePassword);
userRouter.post('/deleteAccount', authMiddleware, deleteAccount);

export default userRouter;
