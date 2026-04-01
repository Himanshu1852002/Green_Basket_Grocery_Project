import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name:      { type: String, required: true, unique: true },
    emoji:     { type: String, default: '🛒' },
    isActive:  { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

const categoryModel = mongoose.model.categories || mongoose.model('categories', categorySchema);
export default categoryModel;
