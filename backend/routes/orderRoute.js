import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { createOrder, fetchAllOrders, orderCount, updateStatus, userOrders, verifyOrder } from '../controllers/orderController.js';
import multer from 'multer';

const orderRouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
})

const upload = multer({ storage: storage });

orderRouter.post('/createOrder', authMiddleware, upload.single("image"), createOrder);
orderRouter.post('/verifyOrder', verifyOrder);
orderRouter.post('/userOrder', authMiddleware, userOrders);
orderRouter.get('/fetchAllOrders', fetchAllOrders);
orderRouter.post('/updateStatus', updateStatus);
orderRouter.get('/orderCount', orderCount);


export default orderRouter;