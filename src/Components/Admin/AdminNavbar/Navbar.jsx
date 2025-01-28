import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/Images/Images/logo_ai.png';
import { FaUserCircle } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const [showLogout, setShowLogout] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userId');
        alert('Admin Logout Successfully');
        navigate('/');
        window.location.reload();
    };

    const toggleLogoutButton = () => {
        setShowLogout((prevState) => !prevState); // Toggles visibility
    };

    return (
        <>
            <nav
                className="navbar admin-navbar z-1 navbar-light bg-light position-fixed top-0"
                style={{ height: '80px', width: '100%' }}
            >
                <div className="container-fluid mx-5">
                    <img src={logo} className="logo" alt="Logo" />
                    <div
                        className="user-icon-container"
                        style={{ position: 'relative' }}
                    >
                        {/* User Icon */}
                        <FaUserCircle
                            size={30}
                            style={{ cursor: 'pointer' }}
                            title="User Options"
                            onClick={toggleLogoutButton}
                        />
                        {/* Logout Button */}
                        {showLogout && (
                            <button
                                className="logout-button"
                                onClick={handleLogout}
                                style={{
                                    position: 'absolute',
                                    top: '40px',
                                    right: '0',
                                    background: 'green',
                                    color: 'white',
                                    border: 'none',
                                    padding: '5px 10px',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    zIndex: 10,
                                }}
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
