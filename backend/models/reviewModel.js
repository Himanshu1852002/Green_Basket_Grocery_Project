import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    userId:    { type: String, required: true },
    userName:  { type: String, required: true },
    rating:    { type: Number, required: true, min: 1, max: 5 },
    comment:   { type: String, default: '' },
    createdAt: { type: Date, default: Date.now }
});

// One review per user per product
reviewSchema.index({ productId: 1, userId: 1 }, { unique: true });

const reviewModel = mongoose.model('review', reviewSchema);
export default reviewModel;
