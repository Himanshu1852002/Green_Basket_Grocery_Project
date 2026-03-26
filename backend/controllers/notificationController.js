import notificationModel from '../models/notificationModel.js';
import userModel from '../models/userModel.js';

// Get user notifications
const getNotifications = async (req, res) => {
    const { userId } = req.body;
    try {
        const notifications = await notificationModel.find({ userId }).sort({ createdAt: -1 }).limit(20);
        const unreadCount = await notificationModel.countDocuments({ userId, isRead: false });
        res.json({ success: true, notifications, unreadCount });
    } catch {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Mark all as read
const markAllRead = async (req, res) => {
    const { userId } = req.body;
    try {
        await notificationModel.updateMany({ userId, isRead: false }, { isRead: true });
        res.json({ success: true });
    } catch {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Mark one as read
const markOneRead = async (req, res) => {
    const { id } = req.params;
    try {
        await notificationModel.findByIdAndUpdate(id, { isRead: true });
        res.json({ success: true });
    } catch {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Create notification (internal use — called from order controller)
const createNotification = async (userId, title, message, type = 'info') => {
    try {
        await notificationModel.create({ userId, title, message, type });
    } catch { /* silent */ }
};

// Admin: Send notification to all users or specific user
const sendNotification = async (req, res) => {
    const { target, title, message, type } = req.body;
    try {
        let userIds = [];
        if (target === 'all') {
            const users = await userModel.find({ role: 'user' }).select('_id');
            userIds = users.map(u => u._id.toString());
        } else {
            userIds = [target];
        }
        await notificationModel.insertMany(userIds.map(userId => ({ userId, title, message, type })));
        res.json({ success: true, count: userIds.length });
    } catch {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export { getNotifications, markAllRead, markOneRead, createNotification, sendNotification };
