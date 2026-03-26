import express from 'express';
import { addReview, getReviews, canReview, getAllReviews, deleteReview } from '../controllers/reviewController.js';
import authMiddleware from '../middleware/auth.js';
import isAdmin from '../middleware/isAdmin.js';

const reviewRouter = express.Router();

reviewRouter.post('/add', authMiddleware, addReview);
reviewRouter.get('/product/:productId', getReviews);
reviewRouter.post('/canReview', authMiddleware, canReview);
reviewRouter.get('/all', getAllReviews);
reviewRouter.delete('/:id', authMiddleware, deleteReview);

export default reviewRouter;
