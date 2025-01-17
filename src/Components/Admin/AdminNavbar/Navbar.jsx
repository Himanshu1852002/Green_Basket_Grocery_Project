import { useNavigate } from 'react-router-dom'; // To handle redirection
import logo from '../../../assets/Images/Images/logo_ai.png';
import { FaUserCircle } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userId')
        alert('Admin Logout Successfully');
        navigate('/');
    };

    return (
        <>
            <nav
                className="navbar admin-navbar z-1 navbar-light bg-light position-fixed top-0"
                style={{ height: '80px', width: '100%' }}
            >
                <div className="container-fluid mx-5">
                    <img src={logo} className="logo" alt="Logo" />
                    <form className="d-flex">
                        <FaUserCircle
                            size={30}
                            style={{ cursor: 'pointer' }}
                            title="Logout"
                            onClick={handleLogout}
                        />
                    </form>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
