import reviewModel from '../models/reviewModel.js';
import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';

// Add or update review
const addReview = async (req, res) => {
    const { userId, productId, rating, comment } = req.body;
    try {
        // Check if user has a delivered order with this product
        const order = await orderModel.findOne({
            userId,
            orderStatus: 'Delivered',
            'items.itemId': productId
        });
        if (!order) return res.json({ success: false, message: 'You can only review products you have purchased and received.' });

        const user = await userModel.findById(userId).select('name');
        const review = await reviewModel.findOneAndUpdate(
            { productId, userId },
            { rating, comment, userName: user.name, createdAt: Date.now() },
            { upsert: true, new: true }
        );
        res.json({ success: true, review });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get all reviews for a product
const getReviews = async (req, res) => {
    const { productId } = req.params;
    try {
        const reviews = await reviewModel.find({ productId }).sort({ createdAt: -1 });
        const avg = reviews.length
            ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
            : 0;
        res.json({ success: true, reviews, avg: parseFloat(avg), total: reviews.length });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Check if user can review (has delivered order with this product)
const canReview = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        const order = await orderModel.findOne({ userId, orderStatus: 'Delivered', 'items.itemId': productId });
        const existing = await reviewModel.findOne({ userId, productId });
        res.json({ success: true, canReview: !!order, existing: existing || null });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export { addReview, getReviews, canReview };
