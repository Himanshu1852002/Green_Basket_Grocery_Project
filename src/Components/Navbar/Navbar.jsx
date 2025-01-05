import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSearch, FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { clearWishlistData, clearWishToken } from '../../Store/wishlistSlice';
import { clearCartData, clearToken } from '../../Store/cartSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../../assets/Images/Images/logo_ai.png';
import './Navbar.css';

const Navbar = ({ setShowLogin }) => {
    const [showSearch, setShowSearch] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [query, setQuery] = useState("");
    const [placeholder, setPlaceholder] = useState("Search for products...");
    const placeholderTexts = [
        "Search for fruits...",
        "Search for vegetables...",
        "Search for snacks...",
        "Search for grocery...",
        "Search for coldrinks...",
        "Search for chocolates...",
    ];

    const handleSearch = () => {
        if (query.trim()) {
            navigate(`/search?q=${query}`);
        }
    };


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const wishlist = useSelector((state) => state.wishlist.items);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const token = localStorage.getItem("token");

    const wishlistCount = Array.isArray(wishlist) ? wishlist.length : Object.keys(wishlist).length;
    const cartItemCount = Array.isArray(cartItems)
        ? cartItems.length
        : Object.values(cartItems).reduce((total, qty) => total + qty, 0);

    const toggleDropdown = () => {
        setShowDropdown((prevState) => !prevState);
    };

    const handleLogOut = () => {
        dispatch(clearToken());
        dispatch(clearCartData());
        dispatch(clearWishToken())
        dispatch(clearWishlistData());
        localStorage.removeItem("token");
        navigate('/');
    }

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            index = (index + 1) % placeholderTexts.length;
            setPlaceholder(placeholderTexts[index]);
        }, 2000); // Change text every 2 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <nav className="navbar navbar-box navbar-light bg-light">
            <div className="container d-flex justify-content-between align-items-center" >
                {/* Logo */}
                <Link to="/">
                    <img className="nav-logo" src={logo} />
                </Link>

                {/* Search Bar */}
                <div className="d-none d-md-flex w-50">
                    <input
                        type="text" value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="form-control"
                        placeholder={placeholder}
                        onBlur={handleSearch}
                    />
                </div>
                <div className="d-flex justify-content-center align-items-center gap-2">
                    <div className="d-flex d-md-none align-items-center">
                        <FaSearch
                            className="icon me-2"
                            size={23}
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
                                    className="badge h-100 w-100 rounded-circle bg-danger"
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
                                    className="badge h-100 w-100 rounded-circle bg-danger"
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
                            <div className="position-relative">
                                <FaUser
                                    className="icon"
                                    size={23}
                                    style={{ cursor: "pointer" }}
                                    onClick={toggleDropdown}
                                />
                                {showDropdown && (
                                    <div
                                        className="dropdown-menu show position-absolute"
                                        style={{
                                            top: '35px',
                                            right: '0',
                                            minWidth: '150px',
                                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                        }}
                                    >
                                        <Link to="/orders" className="dropdown-item">Orders</Link>
                                        <Link to="/saved-address" className="dropdown-item">Saved Address</Link>
                                        <button
                                            className="dropdown-item"
                                            onClick={() => {
                                                handleLogOut()
                                            }}
                                        >
                                            Log Out
                                        </button>
                                    </div>
                                )}
                            </div>
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
