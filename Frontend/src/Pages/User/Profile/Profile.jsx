import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaSave, FaShoppingBag, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Profile.css';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://green-basket-grocery-project.onrender.com';

const Profile = () => {
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [data, setData] = useState({ name: '', email: '', phone: '', address: { street: '', city: '', state: '', pincode: '' } });

    useEffect(() => {
        axios.post(`${BASE_URL}/api/user/profile`, {}, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                if (res.data.success) {
                    const u = res.data.user;
                    setData({
                        name: u.name || '',
                        email: u.email || '',
                        phone: u.phone || '',
                        address: u.address || { street: '', city: '', state: '', pincode: '' }
                    });
                }
            })
            .finally(() => setLoading(false));
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (['street', 'city', 'state', 'pincode'].includes(name)) {
            setData(p => ({ ...p, address: { ...p.address, [name]: value } }));
        } else {
            setData(p => ({ ...p, [name]: value }));
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await axios.post(`${BASE_URL}/api/user/updateProfile`,
                { name: data.name, phone: data.phone, address: data.address },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.data.success) {
                localStorage.setItem('name', data.name);
                toast.success('Profile updated!', { autoClose: 2000 });
            }
        } catch { toast.error('Failed to update profile'); }
        finally { setSaving(false); }
    };

    if (loading) return <div className="pf-loading"><div className="pf-spinner" /></div>;

    return (
        <div className="pf-page">
            <div className="pf-banner">
                <p className="pf-breadcrumb">Home › My Profile</p>
                <h1 className="pf-title">My Profile</h1>
                <p className="pf-sub">Manage your account information</p>
            </div>

            <div className="pf-container">
                {/* Left — Avatar + Quick Links */}
                <div className="pf-left">
                    <div className="pf-avatar-wrap">
                        <div className="pf-avatar">{data.name?.charAt(0).toUpperCase()}</div>
                        <h3 className="pf-name">{data.name}</h3>
                        <p className="pf-email">{data.email}</p>
                    </div>
                    <div className="pf-quick-links">
                        <Link to="/user/myorders" className="pf-quick-link"><FaShoppingBag size={14} /> My Orders</Link>
                        <Link to="/user/wishlist" className="pf-quick-link"><FaHeart size={14} /> Wishlist</Link>
                    </div>
                </div>

                {/* Right — Form */}
                <div className="pf-right">
                    <h3 className="pf-section-title">Personal Information</h3>
                    <div className="pf-form">
                        <div className="pf-field">
                            <label><FaUser size={12} /> Full Name</label>
                            <input name="name" value={data.name} onChange={handleChange} placeholder="Full Name" />
                        </div>
                        <div className="pf-field">
                            <label><FaEnvelope size={12} /> Email</label>
                            <input name="email" value={data.email} disabled className="pf-disabled" />
                        </div>
                        <div className="pf-field">
                            <label><FaPhone size={12} /> Phone</label>
                            <input name="phone" value={data.phone} onChange={handleChange} placeholder="10-digit phone number" />
                        </div>
                    </div>

                    <h3 className="pf-section-title" style={{ marginTop: '24px' }}><FaMapMarkerAlt size={13} /> Saved Address</h3>
                    <div className="pf-form">
                        <div className="pf-field pf-full">
                            <label>Street</label>
                            <input name="street" value={data.address.street} onChange={handleChange} placeholder="Street address" />
                        </div>
                        <div className="pf-field">
                            <label>City</label>
                            <input name="city" value={data.address.city} onChange={handleChange} placeholder="City" />
                        </div>
                        <div className="pf-field">
                            <label>State</label>
                            <input name="state" value={data.address.state} onChange={handleChange} placeholder="State" />
                        </div>
                        <div className="pf-field">
                            <label>Pincode</label>
                            <input name="pincode" value={data.address.pincode} onChange={handleChange} placeholder="Pincode" />
                        </div>
                    </div>

                    <button className="pf-save-btn" onClick={handleSave} disabled={saving}>
                        <FaSave size={13} /> {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
