import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { SlHandbag } from "react-icons/sl";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { clearWishlistData, clearWishToken } from '../../../Store/wishlistSlice';
import { clearCartData, clearToken } from '../../../Store/cartSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import CartSidebar from "../../../Pages/User/Cart/CartSidebar";
import logo from '../../../assets/Images/Images/logo_ai.png';
import { FaSearch } from "react-icons/fa";
import './Navbar.css';

const Navbar = ({ setShowLogin }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showCartSidebar, setShowCartSidebar] = useState(false);
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const [query, setQuery] = useState("");
    const [placeholder, setPlaceholder] = useState("Search for products...");


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

    const handleLogOut = async () => {
        dispatch(clearToken());
        dispatch(clearCartData());
        dispatch(clearWishToken())
        dispatch(clearWishlistData());
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
        navigate('/');
    };

    const handleNavCollapse = () => {
        setIsNavCollapsed((prevState) => !prevState);
    };


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
            navigate(`/user/search?q=${query}`);
        }
        else {
            navigate("/")
        }
    };

    useEffect(() => {
        if (query.trim()) {
            handleSearch();
        }
        else {
            navigate("/")
        }
    }, [query]);

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            index = (index + 1) % placeholderTexts.length;
            setPlaceholder(placeholderTexts[index]);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <nav className="navbar navbar-box navbar-expand-lg navbar-light bg-light">
            <div className="container px-3 d-flex justify-content-between align-items-center">
                {/* Logo */}
                <Link to="/" className="navbar-brand">
                    <img className="nav-logo" src={logo} alt="Brand Logo" />
                </Link>
                <div className="input-group w-50 mx-auto d-flex d-lg-none">
                    <span className="input-group-text">
                        <FaSearch size={20} />
                    </span>
                    <input
                        type="text"
                        className="form-control search-input"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={placeholder}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                </div>
                <button
                    className="navbar-toggler"
                    type="button"
                    aria-expanded={!isNavCollapsed}
                    aria-label="Toggle navigation"
                    onClick={handleNavCollapse}
                >
                    {isNavCollapsed ? <FaBars /> : <FaTimes />}
                </button>

                {/* Collapsible Content */}
                <div
                    className={`collapse navbar-collapse ${isNavCollapsed ? "" : "show"}`}
                    id="navbarContent"
                >

                    <div className="input-group w-50 mx-auto d-none d-lg-flex">
                        <span className="input-group-text">
                            <FaSearch size={20} />
                        </span>
                        <input
                            type="text"
                            className="form-control search-input"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={placeholder}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        />
                    </div>

                    {/* Wishlist, Cart, and Login */}
                    <div className="d-flex align-items-center flex-column flex-lg-row gap-4">
                        <div className="position-relative">
                            <Link to={'/user/wishlist'}>
                                <FaRegHeart className="icon" size={23} />
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
                                    }} >
                                    {wishlistCount}
                                </span>
                            )}
                        </div>
                        <div className="position-relative">
                            <SlHandbag className="icon" size={23} style={{ cursor: "pointer" }} onClick={() => setShowCartSidebar(!showCartSidebar)} />
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
                                    }} >
                                    {cartItemCount}
                                </span>
                            )}
                        </div>
                        {showCartSidebar && (
                            <CartSidebar
                                show={showCartSidebar}
                                onClose={() => setShowCartSidebar(false)}
                            />
                        )}

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
                                        <Link to="/user/myorders" className="dropdown-item" onClick={() => setShowDropdown(false)}>Orders</Link>
                                        {/* <Link to="/user/saved-address" className="dropdown-item" onClick={() => setShowDropdown(false)}>Saved Address</Link> */}
                                        <button
                                            className="dropdown-item"
                                            onClick={() => {
                                                handleLogOut();
                                                setShowDropdown(false);
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
        </nav>
    );
};

Navbar.propTypes = {
    setShowLogin: PropTypes.func.isRequired,
};

export default Navbar;
