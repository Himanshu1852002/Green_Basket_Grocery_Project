import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaSave, FaShoppingBag, FaHeart, FaLock, FaTrash, FaPlus, FaCamera, FaHome, FaBriefcase, FaLocationArrow, FaBell, FaSignOutAlt, FaEdit, FaTimes, FaStar } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './Profile.css';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://green-basket-grocery-project.onrender.com';

const TABS = ['Personal', 'Addresses', 'Security', 'Preferences'];

const emptyAddress = { label: 'Home', street: '', city: '', state: '', pincode: '' };

const Profile = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const fileRef = useRef();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('Personal');
    const [avatarUploading, setAvatarUploading] = useState(false);

    const [data, setData] = useState({
        name: '', email: '', phone: '', dob: '', gender: '',
        avatar: '',
        address: { street: '', city: '', state: '', pincode: '' },
        addresses: [],
        preferences: { emailNotifications: true, defaultAddressIndex: 0 },
        createdAt: ''
    });

    const [stats, setStats] = useState({ orders: 0, wishlist: 0 });
    const [pwForm, setPwForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
    const [pwSaving, setPwSaving] = useState(false);
    const [deletePass, setDeletePass] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [addrEdit, setAddrEdit] = useState(null); // index or 'new'

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [profileRes, orderRes, wishlistRes] = await Promise.all([
                    axios.post(`${BASE_URL}/api/user/profile`, {}, { headers: { Authorization: `Bearer ${token}` } }),
                    axios.post(`${BASE_URL}/api/orders/userOrder`, {}, { headers: { Authorization: `Bearer ${token}` } }),
                    axios.post(`${BASE_URL}/api/wishlist/get`, {}, { headers: { Authorization: `Bearer ${token}` } }),
                ]);
                if (profileRes.data.success) {
                    const u = profileRes.data.user;
                    setData({
                        name: u.name || '',
                        email: u.email || '',
                        phone: u.phone || '',
                        dob: u.dob || '',
                        gender: u.gender || '',
                        avatar: u.avatar || '',
                        address: u.address || { street: '', city: '', state: '', pincode: '' },
                        addresses: u.addresses || [],
                        preferences: u.preferences || { emailNotifications: true, defaultAddressIndex: 0 },
                        createdAt: u.createdAt || ''
                    });
                }
                const orderCount = orderRes.data.success ? (orderRes.data.data?.length || 0) : 0;
                const wishlistCount = wishlistRes.data.success ? Object.keys(wishlistRes.data.wishlistData || {}).length : 0;
                setStats({ orders: orderCount, wishlist: wishlistCount });
            } catch { /* silent */ }
            finally { setLoading(false); }
        };
        fetchAll();
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(p => ({ ...p, [name]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await axios.post(`${BASE_URL}/api/user/updateProfile`,
                { name: data.name, phone: data.phone, dob: data.dob, gender: data.gender, address: data.address, addresses: data.addresses, preferences: data.preferences },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.data.success) {
                localStorage.setItem('name', data.name);
                toast.success('Profile updated!', { autoClose: 2000 });
            }
        } catch { toast.error('Failed to update profile'); }
        finally { setSaving(false); }
    };

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) { toast.error('Image must be under 2MB'); return; }
        setAvatarUploading(true);
        const formData = new FormData();
        formData.append('avatar', file);
        try {
            const res = await axios.post(`${BASE_URL}/api/user/updateAvatar`, formData,
                { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
            );
            if (res.data.success) {
                setData(p => ({ ...p, avatar: res.data.avatar }));
                toast.success('Avatar updated!', { autoClose: 2000 });
            }
        } catch { toast.error('Avatar upload failed'); }
        finally { setAvatarUploading(false); }
    };

    const handleChangePassword = async () => {
        if (pwForm.newPassword !== pwForm.confirmPassword) { toast.error('Passwords do not match'); return; }
        if (pwForm.newPassword.length < 8) { toast.error('Password must be at least 8 characters'); return; }
        setPwSaving(true);
        try {
            const res = await axios.post(`${BASE_URL}/api/user/changePassword`,
                { oldPassword: pwForm.oldPassword, newPassword: pwForm.newPassword },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.data.success) {
                toast.success('Password changed!', { autoClose: 2000 });
                setPwForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
            } else toast.error(res.data.message);
        } catch { toast.error('Failed to change password'); }
        finally { setPwSaving(false); }
    };

    const handleDeleteAccount = async () => {
        try {
            const res = await axios.post(`${BASE_URL}/api/user/deleteAccount`,
                { password: deletePass },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.data.success) {
                toast.success('Account deleted');
                localStorage.clear();
                navigate('/');
            } else toast.error(res.data.message);
        } catch { toast.error('Failed to delete account'); }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
        toast.success('Logged out!', { autoClose: 1500 });
    };

    // Address helpers
    const saveAddress = (addr) => {
        const updated = [...data.addresses];
        if (addrEdit === 'new') updated.push(addr);
        else updated[addrEdit] = addr;
        setData(p => ({ ...p, addresses: updated }));
        setAddrEdit(null);
    };
    const removeAddress = (i) => {
        const updated = data.addresses.filter((_, idx) => idx !== i);
        setData(p => ({ ...p, addresses: updated }));
    };
    const setDefault = (i) => setData(p => ({ ...p, preferences: { ...p.preferences, defaultAddressIndex: i } }));

    const labelIcon = (label) => label === 'Home' ? <FaHome size={12} /> : label === 'Work' ? <FaBriefcase size={12} /> : <FaLocationArrow size={12} />;

    const memberSince = data.createdAt ? new Date(data.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : '';

    if (loading) return <div className="pf-loading"><div className="pf-spinner" /></div>;

    return (
        <div className="pf-page">
            <div className="pf-banner">
                <p className="pf-breadcrumb">Home › My Profile</p>
                <h1 className="pf-title">My Profile</h1>
                <p className="pf-sub">Manage your account information</p>
            </div>

            <div className="pf-container">
                {/* Left */}
                <div className="pf-left">
                    <div className="pf-avatar-wrap">
                        <div className="pf-avatar-container">
                            {data.avatar
                                ? <img src={`${BASE_URL}${data.avatar}`} alt="avatar" className="pf-avatar-img" />
                                : <div className="pf-avatar">{data.name?.charAt(0).toUpperCase()}</div>
                            }
                            <button className="pf-avatar-edit" onClick={() => fileRef.current.click()} disabled={avatarUploading}>
                                {avatarUploading ? <div className="pf-mini-spin" /> : <FaCamera size={12} />}
                            </button>
                            <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleAvatarChange} />
                        </div>
                        <h3 className="pf-name">{data.name}</h3>
                        <p className="pf-email">{data.email}</p>
                        {memberSince && <p className="pf-member-since">Member since {memberSince}</p>}
                    </div>

                    {/* Stats */}
                    <div className="pf-stats">
                        <div className="pf-stat"><span className="pf-stat-num">{stats.orders}</span><span className="pf-stat-label">Orders</span></div>
                        <div className="pf-stat-divider" />
                        <div className="pf-stat"><span className="pf-stat-num">{stats.wishlist}</span><span className="pf-stat-label">Wishlist</span></div>
                    </div>

                    <div className="pf-quick-links">
                        <Link to="/user/myorders" className="pf-quick-link"><FaShoppingBag size={14} /> My Orders</Link>
                        <Link to="/user/wishlist" className="pf-quick-link"><FaHeart size={14} /> Wishlist</Link>
                        <button className="pf-quick-link pf-logout-btn" onClick={handleLogout}><FaSignOutAlt size={14} /> Logout</button>
                    </div>
                </div>

                {/* Right */}
                <div className="pf-right">
                    {/* Tabs */}
                    <div className="pf-tabs">
                        {TABS.map(t => (
                            <button key={t} className={`pf-tab ${activeTab === t ? 'pf-tab-active' : ''}`} onClick={() => setActiveTab(t)}>{t}</button>
                        ))}
                    </div>

                    {/* Personal Tab */}
                    {activeTab === 'Personal' && (
                        <div className="pf-tab-content">
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
                                <div className="pf-field">
                                    <label>Date of Birth</label>
                                    <input type="date" name="dob" value={data.dob} onChange={handleChange} />
                                </div>
                                <div className="pf-field pf-full">
                                    <label>Gender</label>
                                    <div className="pf-gender-group">
                                        {['Male', 'Female', 'Other'].map(g => (
                                            <button key={g} className={`pf-gender-btn ${data.gender === g ? 'pf-gender-active' : ''}`} onClick={() => setData(p => ({ ...p, gender: g }))}>{g}</button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <h3 className="pf-section-title" style={{ marginTop: '24px' }}><FaMapMarkerAlt size={13} /> Primary Address</h3>
                            <div className="pf-form">
                                <div className="pf-field pf-full">
                                    <label>Street</label>
                                    <input name="street" value={data.address.street} onChange={e => setData(p => ({ ...p, address: { ...p.address, street: e.target.value } }))} placeholder="Street address" />
                                </div>
                                <div className="pf-field">
                                    <label>City</label>
                                    <input name="city" value={data.address.city} onChange={e => setData(p => ({ ...p, address: { ...p.address, city: e.target.value } }))} placeholder="City" />
                                </div>
                                <div className="pf-field">
                                    <label>State</label>
                                    <input name="state" value={data.address.state} onChange={e => setData(p => ({ ...p, address: { ...p.address, state: e.target.value } }))} placeholder="State" />
                                </div>
                                <div className="pf-field">
                                    <label>Pincode</label>
                                    <input name="pincode" value={data.address.pincode} onChange={e => setData(p => ({ ...p, address: { ...p.address, pincode: e.target.value } }))} placeholder="Pincode" />
                                </div>
                            </div>

                            <button className="pf-save-btn" onClick={handleSave} disabled={saving}>
                                <FaSave size={13} /> {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    )}

                    {/* Addresses Tab */}
                    {activeTab === 'Addresses' && (
                        <div className="pf-tab-content">
                            <div className="pf-addr-header">
                                <h3 className="pf-section-title"><FaMapMarkerAlt size={13} /> Saved Addresses</h3>
                                <button className="pf-add-addr-btn" onClick={() => setAddrEdit('new')}><FaPlus size={11} /> Add New</button>
                            </div>

                            {data.addresses.length === 0 && addrEdit !== 'new' && (
                                <p className="pf-empty-msg">No saved addresses. Add one!</p>
                            )}

                            {data.addresses.map((addr, i) => (
                                addrEdit === i
                                    ? <AddressForm key={i} initial={addr} onSave={saveAddress} onCancel={() => setAddrEdit(null)} />
                                    : (
                                        <div key={i} className={`pf-addr-card ${data.preferences.defaultAddressIndex === i ? 'pf-addr-default' : ''}`}>
                                            <div className="pf-addr-top">
                                                <span className="pf-addr-label">{labelIcon(addr.label)} {addr.label}</span>
                                                {data.preferences.defaultAddressIndex === i && <span className="pf-default-badge"><FaStar size={10} /> Default</span>}
                                                <div className="pf-addr-actions">
                                                    {data.preferences.defaultAddressIndex !== i && <button className="pf-addr-btn" onClick={() => setDefault(i)}>Set Default</button>}
                                                    <button className="pf-addr-icon-btn" onClick={() => setAddrEdit(i)}><FaEdit size={13} /></button>
                                                    <button className="pf-addr-icon-btn pf-addr-del" onClick={() => removeAddress(i)}><FaTrash size={13} /></button>
                                                </div>
                                            </div>
                                            <p className="pf-addr-text">{addr.street}, {addr.city}, {addr.state} - {addr.pincode}</p>
                                        </div>
                                    )
                            ))}

                            {addrEdit === 'new' && <AddressForm initial={emptyAddress} onSave={saveAddress} onCancel={() => setAddrEdit(null)} />}

                            {data.addresses.length > 0 && (
                                <button className="pf-save-btn" style={{ marginTop: '20px' }} onClick={handleSave} disabled={saving}>
                                    <FaSave size={13} /> {saving ? 'Saving...' : 'Save Addresses'}
                                </button>
                            )}
                        </div>
                    )}

                    {/* Security Tab */}
                    {activeTab === 'Security' && (
                        <div className="pf-tab-content">
                            <h3 className="pf-section-title"><FaLock size={13} /> Change Password</h3>
                            <div className="pf-form pf-single-col">
                                <div className="pf-field pf-full">
                                    <label>Current Password</label>
                                    <input type="password" value={pwForm.oldPassword} onChange={e => setPwForm(p => ({ ...p, oldPassword: e.target.value }))} placeholder="Enter current password" />
                                </div>
                                <div className="pf-field pf-full">
                                    <label>New Password</label>
                                    <input type="password" value={pwForm.newPassword} onChange={e => setPwForm(p => ({ ...p, newPassword: e.target.value }))} placeholder="Min 8 characters" />
                                </div>
                                <div className="pf-field pf-full">
                                    <label>Confirm New Password</label>
                                    <input type="password" value={pwForm.confirmPassword} onChange={e => setPwForm(p => ({ ...p, confirmPassword: e.target.value }))} placeholder="Repeat new password" />
                                </div>
                            </div>
                            <button className="pf-save-btn" onClick={handleChangePassword} disabled={pwSaving}>
                                <FaLock size={13} /> {pwSaving ? 'Changing...' : 'Change Password'}
                            </button>

                            <div className="pf-danger-zone">
                                <h3 className="pf-section-title pf-danger-title"><FaTrash size={13} /> Danger Zone</h3>
                                <p className="pf-danger-desc">Permanently delete your account and all associated data. This action cannot be undone.</p>
                                <button className="pf-delete-btn" onClick={() => setShowDeleteModal(true)}><FaTrash size={13} /> Delete My Account</button>
                            </div>
                        </div>
                    )}

                    {/* Preferences Tab */}
                    {activeTab === 'Preferences' && (
                        <div className="pf-tab-content">
                            <h3 className="pf-section-title"><FaBell size={13} /> Notifications</h3>
                            <div className="pf-pref-row">
                                <div>
                                    <p className="pf-pref-label">Email Notifications</p>
                                    <p className="pf-pref-desc">Receive order updates and offers via email</p>
                                </div>
                                <label className="pf-toggle">
                                    <input type="checkbox" checked={data.preferences.emailNotifications}
                                        onChange={e => setData(p => ({ ...p, preferences: { ...p.preferences, emailNotifications: e.target.checked } }))} />
                                    <span className="pf-toggle-slider" />
                                </label>
                            </div>

                            {data.addresses.length > 0 && (
                                <>
                                    <h3 className="pf-section-title" style={{ marginTop: '24px' }}><FaMapMarkerAlt size={13} /> Default Delivery Address</h3>
                                    <div className="pf-default-addr-list">
                                        {data.addresses.map((addr, i) => (
                                            <div key={i} className={`pf-default-addr-item ${data.preferences.defaultAddressIndex === i ? 'pf-default-addr-active' : ''}`}
                                                onClick={() => setData(p => ({ ...p, preferences: { ...p.preferences, defaultAddressIndex: i } }))}>
                                                <span>{labelIcon(addr.label)} {addr.label}</span>
                                                <span className="pf-default-addr-text">{addr.city}, {addr.pincode}</span>
                                                {data.preferences.defaultAddressIndex === i && <FaStar size={12} color="#059212" />}
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            <button className="pf-save-btn" style={{ marginTop: '28px' }} onClick={handleSave} disabled={saving}>
                                <FaSave size={13} /> {saving ? 'Saving...' : 'Save Preferences'}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="pf-modal-overlay" onClick={() => setShowDeleteModal(false)}>
                    <div className="pf-modal" onClick={e => e.stopPropagation()}>
                        <button className="pf-modal-close" onClick={() => setShowDeleteModal(false)}><FaTimes /></button>
                        <h3 className="pf-modal-title">Delete Account</h3>
                        <p className="pf-modal-desc">Enter your password to confirm account deletion. This cannot be undone.</p>
                        <input type="password" className="pf-modal-input" placeholder="Enter your password" value={deletePass} onChange={e => setDeletePass(e.target.value)} />
                        <div className="pf-modal-actions">
                            <button className="pf-modal-cancel" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                            <button className="pf-delete-btn" onClick={handleDeleteAccount}>Delete Account</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const AddressForm = ({ initial, onSave, onCancel }) => {
    const [form, setForm] = useState({ ...initial });
    const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    return (
        <div className="pf-addr-form">
            <div className="pf-field pf-full">
                <label>Label</label>
                <div className="pf-gender-group">
                    {['Home', 'Work', 'Other'].map(l => (
                        <button key={l} type="button" className={`pf-gender-btn ${form.label === l ? 'pf-gender-active' : ''}`} onClick={() => setForm(p => ({ ...p, label: l }))}>{l}</button>
                    ))}
                </div>
            </div>
            <div className="pf-form" style={{ marginTop: '12px' }}>
                <div className="pf-field pf-full">
                    <label>Street</label>
                    <input name="street" value={form.street} onChange={handleChange} placeholder="Street address" />
                </div>
                <div className="pf-field">
                    <label>City</label>
                    <input name="city" value={form.city} onChange={handleChange} placeholder="City" />
                </div>
                <div className="pf-field">
                    <label>State</label>
                    <input name="state" value={form.state} onChange={handleChange} placeholder="State" />
                </div>
                <div className="pf-field">
                    <label>Pincode</label>
                    <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="Pincode" />
                </div>
            </div>
            <div className="pf-addr-form-actions">
                <button className="pf-save-btn" style={{ marginTop: 0 }} onClick={() => onSave(form)}><FaSave size={12} /> Save</button>
                <button className="pf-modal-cancel" onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default Profile;
