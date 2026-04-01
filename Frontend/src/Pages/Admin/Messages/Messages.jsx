import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEnvelope, FaEnvelopeOpen, FaTrash, FaUser, FaClock } from 'react-icons/fa';
import './Messages.css';

const URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [selected, setSelected] = useState(null);
    const [filter, setFilter] = useState('all');

    const fetchMessages = async () => {
        try {
            const res = await axios.get(`${URL}/api/contact/all`);
            if (res.data.success) setMessages(res.data.data);
        } catch (e) { console.error(e); }
    };

    useEffect(() => { fetchMessages(); }, []);

    const handleOpen = async (msg) => {
        setSelected(msg);
        if (!msg.isRead) {
            await axios.post(`${URL}/api/contact/read`, { id: msg._id });
            setMessages(prev => prev.map(m => m._id === msg._id ? { ...m, isRead: true } : m));
        }
    };

    const handleDelete = async (id, e) => {
        e.stopPropagation();
        await axios.post(`${URL}/api/contact/delete`, { id });
        toast.success('Message deleted');
        setMessages(prev => prev.filter(m => m._id !== id));
        if (selected?._id === id) setSelected(null);
    };

    const filtered = messages.filter(m => filter === 'all' ? true : filter === 'unread' ? !m.isRead : m.isRead);
    const unreadCount = messages.filter(m => !m.isRead).length;

    const timeAgo = (date) => {
        const diff = Math.floor((Date.now() - new Date(date)) / 1000);
        if (diff < 60) return `${diff}s ago`;
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return new Date(date).toLocaleDateString('en-IN');
    };

    return (
        <div className="msg-page">
            <div className="msg-header">
                <div>
                    <h2 className="msg-title">📬 Contact Messages</h2>
                    <p className="msg-sub">{messages.length} total · {unreadCount} unread</p>
                </div>
                <div className="msg-filters">
                    {['all', 'unread', 'read'].map(f => (
                        <button key={f} className={`msg-filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                            {f === 'unread' && unreadCount > 0 && <span className="msg-badge">{unreadCount}</span>}
                        </button>
                    ))}
                </div>
            </div>

            <div className="msg-layout">
                {/* List */}
                <div className="msg-list">
                    {filtered.length === 0 && <p className="msg-empty">No messages found</p>}
                    {filtered.map(msg => (
                        <div key={msg._id} className={`msg-item ${!msg.isRead ? 'msg-unread' : ''} ${selected?._id === msg._id ? 'msg-active' : ''}`} onClick={() => handleOpen(msg)}>
                            <div className="msg-item-icon">
                                {msg.isRead ? <FaEnvelopeOpen size={15} color="#aaa" /> : <FaEnvelope size={15} color="#059212" />}
                            </div>
                            <div className="msg-item-body">
                                <div className="msg-item-top">
                                    <span className="msg-item-name">{msg.name}</span>
                                    <span className="msg-item-time"><FaClock size={10} /> {timeAgo(msg.createdAt)}</span>
                                </div>
                                <p className="msg-item-subject">{msg.subject || 'No subject'}</p>
                                <p className="msg-item-preview">{msg.message.slice(0, 60)}...</p>
                            </div>
                            <button className="msg-del-btn" onClick={(e) => handleDelete(msg._id, e)}><FaTrash size={12} /></button>
                        </div>
                    ))}
                </div>

                {/* Detail */}
                <div className="msg-detail">
                    {!selected ? (
                        <div className="msg-empty-detail">
                            <FaEnvelope size={40} color="#c8e6c9" />
                            <p>Select a message to read</p>
                        </div>
                    ) : (
                        <>
                            <div className="msg-detail-header">
                                <h3 className="msg-detail-subject">{selected.subject || 'No Subject'}</h3>
                                <button className="msg-detail-del" onClick={(e) => handleDelete(selected._id, e)}><FaTrash size={13} /> Delete</button>
                            </div>
                            <div className="msg-detail-meta">
                                <div className="msg-meta-item"><FaUser size={12} /> <strong>{selected.name}</strong></div>
                                <div className="msg-meta-item"><FaEnvelope size={12} /> <a href={`mailto:${selected.email}`}>{selected.email}</a></div>
                                <div className="msg-meta-item"><FaClock size={12} /> {new Date(selected.createdAt).toLocaleString('en-IN')}</div>
                            </div>
                            <div className="msg-detail-body">{selected.message}</div>
                            <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`} className="msg-reply-btn">↩ Reply via Email</a>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Messages;
