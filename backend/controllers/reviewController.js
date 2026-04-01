import reviewModel from '../models/reviewModel.js';
import userModel from '../models/userModel.js';
import productModel from '../models/productModel.js';

// Check if user can review
const canReview = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        const existing = await reviewModel.findOne({ userId, productId });
        res.json({ success: true, canReview: true, existing: existing || null });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Add or update review
const addReview = async (req, res) => {
    const { userId, productId, rating, comment } = req.body;
    try {
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

// Get ALL reviews with product info (admin)
const getAllReviews = async (req, res) => {
    try {
        const reviews = await reviewModel.find().sort({ createdAt: -1 });
        const reviewsWithProduct = await Promise.all(reviews.map(async (r) => {
            const product = await productModel.findById(r.productId).select('name image');
            return {
                ...r.toObject(),
                productName: product?.name || 'Unknown Product',
                productImage: product?.image || null,
            };
        }));
        res.json({ success: true, reviews: reviewsWithProduct });
    } catch {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Delete review (admin)
const deleteReview = async (req, res) => {
    try {
        await reviewModel.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export { addReview, getReviews, canReview, getAllReviews, deleteReview };
