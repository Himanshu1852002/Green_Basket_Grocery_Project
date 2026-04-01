import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    name:    { type: String, required: true },
    email:   { type: String, required: true },
    subject: { type: String, default: '' },
    message: { type: String, required: true },
    isRead:  { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const contactModel = mongoose.model.contacts || mongoose.model('contacts', contactSchema);
export default contactModel;
