import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    userId:    { type: String, required: true },
    title:     { type: String, required: true },
    message:   { type: String, required: true },
    type:      { type: String, default: 'info' }, // info | order | offer
    isRead:    { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const notificationModel = mongoose.model('notification', notificationSchema);
export default notificationModel;
