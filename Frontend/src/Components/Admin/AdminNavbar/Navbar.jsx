import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaChevronDown, FaSignOutAlt, FaUserShield } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

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
                <button className="an-icon-btn">
                    <FaBell size={16} />
                    <span className="an-notif-dot" />
                </button>

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
