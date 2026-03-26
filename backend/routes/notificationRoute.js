import express from 'express';
import { getNotifications, markAllRead, markOneRead } from '../controllers/notificationController.js';
import authMiddleware from '../middleware/auth.js';

const notificationRouter = express.Router();

notificationRouter.post('/get', authMiddleware, getNotifications);
notificationRouter.post('/markAllRead', authMiddleware, markAllRead);
notificationRouter.patch('/markRead/:id', authMiddleware, markOneRead);

export default notificationRouter;
