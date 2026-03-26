import express from 'express';
import { addReview, getReviews, canReview } from '../controllers/reviewController.js';
import authMiddleware from '../middleware/auth.js';

const reviewRouter = express.Router();

reviewRouter.post('/add', authMiddleware, addReview);
reviewRouter.get('/product/:productId', getReviews);
reviewRouter.post('/canReview', authMiddleware, canReview);

export default reviewRouter;
