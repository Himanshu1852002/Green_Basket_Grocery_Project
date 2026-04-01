import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaPlus, FaTrash, FaToggleOn, FaToggleOff, FaTag } from 'react-icons/fa';
import './Coupons.css';

const URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
const EMPTY = { code: '', type: 'percent', value: '', minOrder: '', maxUses: '', expiresAt: '' };

const Coupons = () => {
    const [coupons, setCoupons] = useState([]);
    const [form, setForm] = useState(EMPTY);
    const [loading, setLoading] = useState(false);

    const fetchCoupons = async () => {
        const res = await axios.get(`${URL}/api/coupons/all`);
        if (res.data.success) setCoupons(res.data.data);
    };

    useEffect(() => { fetchCoupons(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.code || !form.value) return toast.error('Code and value are required');
        setLoading(true);
        const res = await axios.post(`${URL}/api/coupons/create`, form);
        if (res.data.success) { toast.success('Coupon created!'); setForm(EMPTY); fetchCoupons(); }
        else toast.error(res.data.message);
        setLoading(false);
    };

    const handleToggle = async (id) => {
        await axios.post(`${URL}/api/coupons/toggle`, { id });
        fetchCoupons();
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this coupon?')) return;
        await axios.post(`${URL}/api/coupons/delete`, { id });
        toast.info('Deleted');
        fetchCoupons();
    };

    return (
        <div className="cp-page">
            <h2 className="cp-title"><FaTag size={18} /> Coupon Management</h2>

            {/* Create Form */}
            <form className="cp-form" onSubmit={handleSubmit}>
                <h4>Create New Coupon</h4>
                <div className="cp-form-grid">
                    <div className="cp-field">
                        <label>Code *</label>
                        <input placeholder="e.g. SAVE20" value={form.code} onChange={e => setForm(p => ({ ...p, code: e.target.value.toUpperCase() }))} required />
                    </div>
                    <div className="cp-field">
                        <label>Type *</label>
                        <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}>
                            <option value="percent">Percentage (%)</option>
                            <option value="flat">Flat (₹)</option>
                        </select>
                    </div>
                    <div className="cp-field">
                        <label>Value * {form.type === 'percent' ? '(%)' : '(₹)'}</label>
                        <input type="number" placeholder={form.type === 'percent' ? 'e.g. 10' : 'e.g. 50'} value={form.value} onChange={e => setForm(p => ({ ...p, value: e.target.value }))} required />
                    </div>
                    <div className="cp-field">
                        <label>Min Order (₹)</label>
                        <input type="number" placeholder="0 = no minimum" value={form.minOrder} onChange={e => setForm(p => ({ ...p, minOrder: e.target.value }))} />
                    </div>
                    <div className="cp-field">
                        <label>Max Uses</label>
                        <input type="number" placeholder="0 = unlimited" value={form.maxUses} onChange={e => setForm(p => ({ ...p, maxUses: e.target.value }))} />
                    </div>
                    <div className="cp-field">
                        <label>Expires At</label>
                        <input type="date" value={form.expiresAt} onChange={e => setForm(p => ({ ...p, expiresAt: e.target.value }))} />
                    </div>
                </div>
                <button type="submit" className="cp-btn-primary" disabled={loading}>
                    <FaPlus size={13} /> {loading ? 'Creating...' : 'Create Coupon'}
                </button>
            </form>

            {/* Coupons List */}
            <div className="cp-table-wrap">
                <table className="cp-table">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Type</th>
                            <th>Value</th>
                            <th>Min Order</th>
                            <th>Uses</th>
                            <th>Expires</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coupons.map(c => (
                            <tr key={c._id}>
                                <td><span className="cp-code">{c.code}</span></td>
                                <td><span className={`cp-type ${c.type}`}>{c.type === 'percent' ? 'Percent' : 'Flat'}</span></td>
                                <td><strong>{c.type === 'percent' ? `${c.value}%` : `₹${c.value}`}</strong></td>
                                <td>{c.minOrder > 0 ? `₹${c.minOrder}` : '—'}</td>
                                <td>{c.usedCount}{c.maxUses > 0 ? ` / ${c.maxUses}` : ' / ∞'}</td>
                                <td>{c.expiresAt ? new Date(c.expiresAt).toLocaleDateString('en-IN') : '—'}</td>
                                <td>
                                    <button className="cp-toggle" onClick={() => handleToggle(c._id)}>
                                        {c.isActive ? <FaToggleOn size={22} color="#059212" /> : <FaToggleOff size={22} color="#aaa" />}
                                    </button>
                                </td>
                                <td>
                                    <button className="cp-del" onClick={() => handleDelete(c._id)}><FaTrash size={13} /></button>
                                </td>
                            </tr>
                        ))}
                        {coupons.length === 0 && <tr><td colSpan={8} className="cp-empty">No coupons yet</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Coupons;
