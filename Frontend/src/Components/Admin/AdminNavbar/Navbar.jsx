import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrdersData, fetchLowStock } from '../../../Store/adminDashSlice';
import { FaBell, FaChevronDown, FaSignOutAlt, FaUserShield, FaBoxOpen, FaShoppingBag, FaExclamationTriangle } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showNotif, setShowNotif]       = useState(false);
    const notifRef = useRef(null);

    const { recentOrders, lowStock } = useSelector(s => s.dashboard);

    useEffect(() => {
        dispatch(fetchOrdersData());
        dispatch(fetchLowStock());
    }, [dispatch]);

    // Close notif panel on outside click
    useEffect(() => {
        const handler = (e) => { if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotif(false); };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const totalNotifs = recentOrders.length + lowStock.length;

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userId');
        navigate('/');
        window.location.reload();
    };

    return (
        <nav className="an-navbar">
            {/* Logo */}
            <div className="an-logo">
                <div className="an-logo-icon">
                    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
                        <path d="M8 10 Q6 6 10 5 Q12 4 13 7" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round"/>
                        <path d="M10 10 C8 14 7 18 9 22 C11 27 15 30 18 30 C21 30 25 27 27 22 C29 18 28 14 26 10 Z" fill="#fff"/>
                        <path d="M14 10 C13 14 13 18 14 22" stroke="#b9f6ca" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                        <path d="M18 10 C18 14 18 18 18 22" stroke="#b9f6ca" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                        <path d="M22 10 C23 14 23 18 22 22" stroke="#b9f6ca" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                        <path d="M10 17 C13 16 23 16 26 17" stroke="#b9f6ca" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    </svg>
                </div>
                <div>
                    <span className="an-logo-text">Green<span>Basket</span></span>
                    <span className="an-logo-sub">Admin Panel</span>
                </div>
            </div>

            {/* Right */}
            <div className="an-right">
                {/* Notification */}
                <div className="an-notif-wrap" ref={notifRef}>
                    <button className="an-icon-btn" onClick={() => setShowNotif(p => !p)}>
                        <FaBell size={16} />
                        {totalNotifs > 0 && <span className="an-notif-dot">{totalNotifs}</span>}
                    </button>

                    {showNotif && (
                        <div className="an-notif-panel">
                            <div className="an-notif-header">
                                <span>Notifications</span>
                                <span className="an-notif-count">{totalNotifs}</span>
                            </div>

                            {/* New Orders */}
                            {recentOrders.length > 0 && (
                                <div className="an-notif-section">
                                    <span className="an-notif-section-label"><FaShoppingBag size={10} /> Recent Orders</span>
                                    {recentOrders.map((o, i) => (
                                        <div key={i} className="an-notif-item">
                                            <div className="an-notif-icon an-notif-order"><FaShoppingBag size={12} /></div>
                                            <div className="an-notif-text">
                                                <span className="an-notif-title">{o.address?.firstName} {o.address?.lastName}</span>
                                                <span className="an-notif-sub">₹{o.amount} · {o.paymentMethod} · <span className={`an-notif-status an-ns-${o.orderStatus?.toLowerCase()}`}>{o.orderStatus}</span></span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Low Stock */}
                            {lowStock.length > 0 && (
                                <div className="an-notif-section">
                                    <span className="an-notif-section-label"><FaExclamationTriangle size={10} /> Low Stock</span>
                                    {lowStock.map((p, i) => (
                                        <div key={i} className="an-notif-item">
                                            <div className="an-notif-icon an-notif-stock"><FaBoxOpen size={12} /></div>
                                            <div className="an-notif-text">
                                                <span className="an-notif-title">{p.name}</span>
                                                <span className="an-notif-sub">Only <strong>{p.quantity}</strong> left in stock</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {totalNotifs === 0 && (
                                <div className="an-notif-empty">No notifications</div>
                            )}
                        </div>
                    )}
                </div>

                {/* Admin profile */}
                <div className="an-profile" onClick={() => setShowDropdown(p => !p)}>
                    <div className="an-avatar">
                        <FaUserShield size={16} />
                    </div>
                    <div className="an-profile-info">
                        <span className="an-profile-name">Admin</span>
                        <span className="an-profile-role">Super Admin</span>
                    </div>
                    <FaChevronDown size={11} className={`an-chevron ${showDropdown ? 'an-chevron-open' : ''}`} />

                    {showDropdown && (
                        <div className="an-dropdown">
                            <button className="an-dropdown-item an-logout" onClick={handleLogout}>
                                <FaSignOutAlt size={13} /> Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
