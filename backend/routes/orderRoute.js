import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { createOrder, verifyOrder } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/createOrder', authMiddleware, createOrder);
orderRouter.post('/verifyOrder', verifyOrder);


export default orderRouter;