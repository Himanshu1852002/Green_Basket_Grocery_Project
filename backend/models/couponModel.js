import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
    code:        { type: String, required: true, unique: true, uppercase: true },
    type:        { type: String, enum: ['percent', 'flat'], required: true },
    value:       { type: Number, required: true },
    minOrder:    { type: Number, default: 0 },
    maxUses:     { type: Number, default: 0 },
    usedCount:   { type: Number, default: 0 },
    isActive:    { type: Boolean, default: true },
    expiresAt:   { type: Date, default: null },
    createdAt:   { type: Date, default: Date.now }
});

const couponModel = mongoose.model.coupons || mongoose.model('coupons', couponSchema);
export default couponModel;
