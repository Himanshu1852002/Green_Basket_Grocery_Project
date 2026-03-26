import { useState, useEffect, useRef } from 'react';
import { FaBell } from 'react-icons/fa';
import axios from 'axios';
import './NotificationBell.css';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://green-basket-grocery-project.onrender.com';

const typeIcon = (type) => type === 'order' ? '🛒' : type === 'offer' ? '🎉' : 'ℹ️';

const NotificationBell = () => {
    const token = localStorage.getItem('token');
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unread, setUnread] = useState(0);
    const ref = useRef();

    const fetchNotifications = async () => {
        if (!token) return;
        try {
            const res = await axios.post(`${BASE_URL}/api/notifications/get`, {}, { headers: { Authorization: `Bearer ${token}` } });
            if (res.data.success) {
                setNotifications(res.data.notifications);
                setUnread(res.data.unreadCount);
            }
        } catch { /* silent */ }
    };

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000); // poll every 30s
        return () => clearInterval(interval);
    }, [token]);

    useEffect(() => {
        const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleOpen = async () => {
        setOpen(p => !p);
        if (!open && unread > 0) {
            try {
                await axios.post(`${BASE_URL}/api/notifications/markAllRead`, {}, { headers: { Authorization: `Bearer ${token}` } });
                setUnread(0);
                setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
            } catch { /* silent */ }
        }
    };

    const timeAgo = (date) => {
        const diff = Math.floor((Date.now() - new Date(date)) / 1000);
        if (diff < 60) return 'just now';
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return `${Math.floor(diff / 86400)}d ago`;
    };

    if (!token) return null;

    return (
        <div className="nb-notif-wrap" ref={ref}>
            <button className="nb-icon-btn nb-notif-btn" onClick={handleOpen} title="Notifications">
                <FaBell size={18} />
                {unread > 0 && <span className="nb-badge nb-notif-badge">{unread > 9 ? '9+' : unread}</span>}
            </button>

            {open && (
                <div className="nb-notif-panel">
                    <div className="nb-notif-header">
                        <span className="nb-notif-title">Notifications</span>
                        {notifications.length > 0 && <span className="nb-notif-count">{notifications.length}</span>}
                    </div>

                    {notifications.length === 0 ? (
                        <div className="nb-notif-empty">
                            <span>🔔</span>
                            <p>No notifications yet</p>
                        </div>
                    ) : (
                        <div className="nb-notif-list">
                            {notifications.map(n => (
                                <div key={n._id} className={`nb-notif-item${n.isRead ? '' : ' nb-notif-unread'}`}>
                                    <span className="nb-notif-icon">{typeIcon(n.type)}</span>
                                    <div className="nb-notif-body">
                                        <p className="nb-notif-item-title">{n.title}</p>
                                        <p className="nb-notif-msg">{n.message}</p>
                                        <span className="nb-notif-time">{timeAgo(n.createdAt)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationBell;
