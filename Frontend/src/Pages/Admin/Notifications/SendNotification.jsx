import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaBell, FaUsers, FaUser, FaPaperPlane } from 'react-icons/fa';
import './SendNotification.css';

const URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const TYPES = [
    { value: 'info',  label: 'ℹ️ Info',  desc: 'General announcement' },
    { value: 'offer', label: '🎉 Offer', desc: 'Discount or promotion' },
    { value: 'order', label: '🛒 Order', desc: 'Order related update' },
];

const SendNotification = () => {
    const [users, setUsers] = useState([]);
    const [target, setTarget] = useState('all'); // 'all' | userId
    const [form, setForm] = useState({ title: '', message: '', type: 'info' });
    const [sending, setSending] = useState(false);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        axios.get(`${URL}/api/user/allUsers`)
            .then(res => { if (res.data.success) setUsers(res.data.data); })
            .catch(() => {});
    }, []);

    const handleSend = async () => {
        if (!form.title.trim() || !form.message.trim()) { toast.error('Title and message are required'); return; }
        setSending(true);
        try {
            const res = await axios.post(`${URL}/api/notifications/send`,
                { target, ...form },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            if (res.data.success) {
                toast.success(`Notification sent to ${res.data.count} user(s)!`);
                setHistory(prev => [{ ...form, target, sentAt: new Date(), count: res.data.count }, ...prev.slice(0, 9)]);
                setForm({ title: '', message: '', type: 'info' });
                setTarget('all');
            } else toast.error(res.data.message);
        } catch { toast.error('Failed to send notification'); }
        setSending(false);
    };

    return (
        <div className="sn-page">
            <div className="sn-header">
                <h1 className="sn-title"><FaBell size={20} /> Send Notification</h1>
                <p className="sn-sub">Send announcements or offers to users</p>
            </div>

            <div className="sn-layout">
                {/* Form */}
                <div className="sn-form-card">
                    <h3 className="sn-section-title">Compose Notification</h3>

                    {/* Target */}
                    <div className="sn-field">
                        <label>Send To</label>
                        <div className="sn-target-row">
                            <button className={`sn-target-btn ${target === 'all' ? 'sn-target-active' : ''}`} onClick={() => setTarget('all')}>
                                <FaUsers size={14} /> All Users ({users.length})
                            </button>
                            <select className="sn-select" value={target === 'all' ? '' : target} onChange={e => setTarget(e.target.value || 'all')}>
                                <option value="">— Specific User —</option>
                                {users.map(u => <option key={u._id} value={u._id}>{u.name} ({u.email})</option>)}
                            </select>
                        </div>
                        {target !== 'all' && (
                            <p className="sn-target-hint"><FaUser size={11} /> Sending to: <strong>{users.find(u => u._id === target)?.name}</strong></p>
                        )}
                    </div>

                    {/* Type */}
                    <div className="sn-field">
                        <label>Notification Type</label>
                        <div className="sn-type-row">
                            {TYPES.map(t => (
                                <button key={t.value} className={`sn-type-btn ${form.type === t.value ? 'sn-type-active' : ''}`} onClick={() => setForm(p => ({ ...p, type: t.value }))}>
                                    <span>{t.label}</span>
                                    <span className="sn-type-desc">{t.desc}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Title */}
                    <div className="sn-field">
                        <label>Title <span className="sn-required">*</span></label>
                        <input className="sn-input" placeholder="e.g. 🎉 Special Offer Today!" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} maxLength={80} />
                        <span className="sn-char-count">{form.title.length}/80</span>
                    </div>

                    {/* Message */}
                    <div className="sn-field">
                        <label>Message <span className="sn-required">*</span></label>
                        <textarea className="sn-textarea" rows={4} placeholder="Write your notification message..." value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} maxLength={200} />
                        <span className="sn-char-count">{form.message.length}/200</span>
                    </div>

                    {/* Preview */}
                    {(form.title || form.message) && (
                        <div className="sn-preview">
                            <p className="sn-preview-label">Preview</p>
                            <div className="sn-preview-card">
                                <span className="sn-preview-icon">{form.type === 'offer' ? '🎉' : form.type === 'order' ? '🛒' : 'ℹ️'}</span>
                                <div>
                                    <p className="sn-preview-title">{form.title || 'Title...'}</p>
                                    <p className="sn-preview-msg">{form.message || 'Message...'}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <button className="sn-send-btn" onClick={handleSend} disabled={sending}>
                        <FaPaperPlane size={14} /> {sending ? 'Sending...' : `Send to ${target === 'all' ? 'All Users' : users.find(u => u._id === target)?.name || 'User'}`}
                    </button>
                </div>

                {/* History */}
                <div className="sn-history-card">
                    <h3 className="sn-section-title">Recent Sent</h3>
                    {history.length === 0 ? (
                        <div className="sn-history-empty"><FaBell size={28} /><p>No notifications sent yet</p></div>
                    ) : (
                        <div className="sn-history-list">
                            {history.map((h, i) => (
                                <div key={i} className="sn-history-item">
                                    <span className="sn-history-icon">{h.type === 'offer' ? '🎉' : h.type === 'order' ? '🛒' : 'ℹ️'}</span>
                                    <div className="sn-history-body">
                                        <p className="sn-history-title">{h.title}</p>
                                        <p className="sn-history-meta">
                                            Sent to {h.target === 'all' ? `all ${h.count} users` : '1 user'} ·{' '}
                                            {new Date(h.sentAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SendNotification;
