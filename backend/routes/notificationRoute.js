import express from 'express';
import { getNotifications, markAllRead, markOneRead, sendNotification } from '../controllers/notificationController.js';
import authMiddleware from '../middleware/auth.js';
import isAdmin from '../middleware/isAdmin.js';

const notificationRouter = express.Router();

notificationRouter.post('/get', authMiddleware, getNotifications);
notificationRouter.post('/markAllRead', authMiddleware, markAllRead);
notificationRouter.patch('/markRead/:id', authMiddleware, markOneRead);
notificationRouter.post('/send', authMiddleware, sendNotification);

export default notificationRouter;
