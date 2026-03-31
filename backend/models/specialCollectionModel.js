import mongoose from 'mongoose';

const specialCollectionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    tag: { type: String, default: '' },
    bgColor: { type: String, default: '#fff8e1' },
    accentColor: { type: String, default: '#f59e0b' },
    productIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }],
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

const specialCollectionModel = mongoose.model.specialcollections || mongoose.model('specialcollections', specialCollectionSchema);
export default specialCollectionModel;
