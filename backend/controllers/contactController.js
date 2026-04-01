import contactModel from '../models/contactModel.js';

const submitContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        if (!name || !email || !message) return res.status(400).json({ success: false, message: 'Name, email and message are required' });
        const contact = new contactModel({ name, email, subject, message });
        await contact.save();
        res.json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getAllContacts = async (req, res) => {
    try {
        const contacts = await contactModel.find().sort({ createdAt: -1 });
        res.json({ success: true, data: contacts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const markAsRead = async (req, res) => {
    try {
        await contactModel.findByIdAndUpdate(req.body.id, { isRead: true });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteContact = async (req, res) => {
    try {
        await contactModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: 'Deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export { submitContact, getAllContacts, markAsRead, deleteContact };
