import { useState, useEffect, useRef } from "react";
import { FaUser, FaBars, FaTimes, FaRegHeart, FaSearch, FaLeaf } from "react-icons/fa";
import { SlHandbag } from "react-icons/sl";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { clearWishlistData, clearWishToken } from '../../../Store/wishlistSlice';
import { clearCartData, clearToken } from '../../../Store/cartSlice';
import PropTypes from 'prop-types';
import CartSidebar from "../../../Pages/User/Cart/CartSidebar";
import './Navbar.css';

const placeholderTexts = [
    "Search for fruits...",
    "Search for vegetables...",
    "Search for snacks...",
    "Search for grocery...",
    "Search for cold drinks...",
    "Search for chocolates...",
];

const Navbar = ({ setShowLogin }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showCartSidebar, setShowCartSidebar] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [placeholder, setPlaceholder] = useState(placeholderTexts[0]);
    const dropdownRef = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const wishlist = useSelector((state) => state.wishlist.items);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const token = localStorage.getItem("token");

    const wishlistCount = Object.keys(wishlist).length;
    const cartItemCount = Object.values(cartItems).reduce((t, q) => t + q, 0);

    // Rotating placeholder
    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            i = (i + 1) % placeholderTexts.length;
            setPlaceholder(placeholderTexts[i]);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    // Outside click — close dropdown
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target))
                setShowDropdown(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // Search on query change
    useEffect(() => {
        if (query.trim()) navigate(`/user/search?q=${query}`);
        else navigate("/");
    }, [query]);

    const handleLogOut = () => {
        dispatch(clearToken());
        dispatch(clearCartData());
        dispatch(clearWishToken());
        dispatch(clearWishlistData());
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
        navigate('/');
    };

    return (
        <>
            <nav className="nb-nav">
                <div className="nb-inner">

                    {/* Logo */}
                    <Link to="/" className="nb-logo">
                        <div className="nb-logo-icon">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {/* Basket body */}
                                <path d="M4 12h20l-2.5 10H6.5L4 12z" fill="#059212" />
                                {/* Basket weave lines */}
                                <path d="M7 12l1.5 10M14 12v10M21 12l-1.5 10" stroke="#1a4d2e" strokeWidth="0.8" strokeOpacity="0.4"/>
                                <path d="M5.5 17h17M5 14.5h18" stroke="#1a4d2e" strokeWidth="0.8" strokeOpacity="0.3"/>
                                {/* Handle */}
                                <path d="M9 12 Q9 6 14 6 Q19 6 19 12" stroke="#1a4d2e" strokeWidth="2" fill="none" strokeLinecap="round"/>
                                {/* Leaf on top */}
                                <path d="M14 6 Q16 3 19 4 Q17 7 14 6Z" fill="#4caf50"/>
                            </svg>
                        </div>
                        <div className="nb-logo-text">
                            <span className="nb-logo-green">Green</span>
                            <span className="nb-logo-dark">Basket</span>
                        </div>
                    </Link>

                    {/* Nav links — desktop */}
                    <div className="nb-links">
                        <Link to="/" className="nb-link">Home</Link>
                        <Link to="/user/about" className="nb-link">About</Link>
                        <Link to="/user/contact" className="nb-link">Contact</Link>
                    </div>

                    {/* Search — desktop */}
                    <div className="nb-search">
                        <FaSearch size={14} className="nb-search-icon" />
                        <input
                            className="nb-search-input"
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={placeholder}
                            onKeyDown={(e) => e.key === "Enter" && query.trim() && navigate(`/user/search?q=${query}`)}
                        />
                    </div>

                    {/* Right actions */}
                    <div className="nb-actions">

                        {/* Wishlist — hide on mobile */}
                        <Link to="/user/wishlist" className="nb-icon-btn nb-hide-mobile" title="Wishlist">
                            <FaRegHeart size={20} />
                            {wishlistCount > 0 && <span className="nb-badge">{wishlistCount}</span>}
                        </Link>

                        {/* Cart */}
                        <button className="nb-icon-btn" title="Cart" onClick={() => setShowCartSidebar(true)}>
                            <SlHandbag size={20} />
                            {cartItemCount > 0 && <span className="nb-badge">{cartItemCount}</span>}
                        </button>

                        {/* User — hide on mobile */}
                        {!token ? (
                            <button className="nb-login-btn nb-hide-mobile" onClick={() => setShowLogin(true)}>Login</button>
                        ) : (
                            <div className="nb-user-wrap nb-hide-mobile" ref={dropdownRef}>
                                <button className="nb-icon-btn" onClick={() => setShowDropdown((p) => !p)} title="Account">
                                    <FaUser size={18} />
                                </button>
                                {showDropdown && (
                                    <div className="nb-dropdown">
                                        <Link to="/user/myorders" className="nb-dropdown-item" onClick={() => setShowDropdown(false)}>
                                            📦 My Orders
                                        </Link>
                                        <Link to="/user/wishlist" className="nb-dropdown-item" onClick={() => setShowDropdown(false)}>
                                            ❤️ Wishlist
                                        </Link>
                                        <hr className="nb-dropdown-divider" />
                                        <button className="nb-dropdown-item nb-logout" onClick={() => { handleLogOut(); setShowDropdown(false); }}>
                                            🚪 Log Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Hamburger */}
                        <button className="nb-hamburger" onClick={() => setMenuOpen((p) => !p)}>
                            {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
                        </button>
                    </div>
                </div>

                {/* Search — mobile */}
                <div className="nb-search-mobile">
                    <FaSearch size={13} className="nb-search-icon" />
                    <input
                        className="nb-search-input"
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={placeholder}
                        onKeyDown={(e) => e.key === "Enter" && query.trim() && navigate(`/user/search?q=${query}`)}
                    />
                </div>

                {/* Mobile menu */}
                {menuOpen && (
                    <div className="nb-mobile-menu">
                        <Link to="/" className="nb-mobile-link" onClick={() => setMenuOpen(false)}>🏠 Home</Link>
                        <Link to="/user/wishlist" className="nb-mobile-link" onClick={() => setMenuOpen(false)}>
                            ❤️ Wishlist {wishlistCount > 0 && <span className="nb-mobile-badge">{wishlistCount}</span>}
                        </Link>
                        <button className="nb-mobile-link nb-mobile-cart-btn" onClick={() => { setShowCartSidebar(true); setMenuOpen(false); }}>
                            🛒 Cart {cartItemCount > 0 && <span className="nb-mobile-badge">{cartItemCount}</span>}
                        </button>
                        <Link to="/user/myorders" className="nb-mobile-link" onClick={() => setMenuOpen(false)}>📦 My Orders</Link>
                        <Link to="/user/about" className="nb-mobile-link" onClick={() => setMenuOpen(false)}>ℹ️ About</Link>
                        <Link to="/user/contact" className="nb-mobile-link" onClick={() => setMenuOpen(false)}>📞 Contact</Link>
                        <hr className="nb-mobile-divider" />
                        {!token ? (
                            <button className="nb-mobile-login" onClick={() => { setShowLogin(true); setMenuOpen(false); }}>Login / Sign Up</button>
                        ) : (
                            <button className="nb-mobile-logout" onClick={() => { handleLogOut(); setMenuOpen(false); }}>🚪 Log Out</button>
                        )}
                    </div>
                )}
            </nav>

            <CartSidebar show={showCartSidebar} onClose={() => setShowCartSidebar(false)} />
        </>
    );
};

Navbar.propTypes = {
    setShowLogin: PropTypes.func.isRequired,
};

export default Navbar;
