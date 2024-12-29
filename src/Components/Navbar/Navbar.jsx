import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSearch, FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";
import { useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import logo from '../../assets/Images/Images/logo_ai.png'
import './Navbar.css'

const Navbar = ({ setShowLogin }) => {
    const [showSearch, setShowSearch] = useState(false);
    const wishlist = useSelector((state) => state.wishlist.items);

    const cartItems = useSelector((state) => state.cart.cartItems);
    const token = localStorage.getItem("token")


    const wishlistCount = Array.isArray(wishlist) ? wishlist.length : Object.keys(wishlist).length;
    const cartItemCount = Array.isArray(cartItems)
        ? cartItems.length
        : Object.values(cartItems).reduce((total, qty) => total + qty, 0);

    return (
        <nav className="navbar navbar-box navbar-light bg-light">
            <div className="container d-flex justify-content-between align-items-center">
                {/* Logo */}
                <Link to="/">
                    <img className="nav-logo" src={logo} alt="" />
                </Link>


                {/* Search Bar */}
                <div className="d-none d-md-flex w-50">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search for products..."
                    />
                </div>
                <div className="d-flex justify-content-center align-items-center gap-2">
                    <div className="d-flex d-md-none align-items-center">
                        <FaSearch
                            className="icon me-2" size={23}
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowSearch(!showSearch)}
                        />
                    </div>

                    {/* Right Icons */}
                    <div className="d-flex align-items-center gap-4">
                        <div className="position-relative">
                            <Link to={'/wishlist'}>
                                <FaHeart className="icon" size={23} style={{ cursor: "pointer" }} />
                            </Link>
                            {wishlistCount > 0 && (
                                <span
                                    className="badge  h-100  w-100 rounded-circle bg-danger"
                                    style={{
                                        position: 'absolute',
                                        top: '-10px',
                                        right: '-20px',
                                        fontSize: '0.7rem',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    {wishlistCount}
                                </span>
                            )}
                        </div>

                        <div className="position-relative">
                            <Link to={'/cart'}>
                                <FaShoppingCart className="icon" size={23} style={{ cursor: "pointer" }} />
                            </Link>
                            {cartItemCount > 0 && (
                                <span
                                    className="badge h-100  w-100 rounded-circle bg-danger"
                                    style={{
                                        position: 'absolute',
                                        top: '-10px',
                                        right: '-20px',
                                        fontSize: '0.8rem',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    {cartItemCount}
                                </span>
                            )}
                        </div>

                        {!token ? (

                            <button onClick={() => setShowLogin(true)} className="login-btn">Login</button>
                        ) : (
                            <Link
                                to={'/userAccount'}
                                className="navbar-profile"
                            >
                                <FaUser className="icon" size={23} />
                            </Link>
                        )}


                    </div>
                </div>

            </div>
            {showSearch && (
                <div className="container mt-2 d-md-none">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search for products..."
                    />
                </div>
            )}
        </nav>
    );
};

Navbar.propTypes = {
   setShowLogin: PropTypes.func.isRequired,
 };

export default Navbar;
