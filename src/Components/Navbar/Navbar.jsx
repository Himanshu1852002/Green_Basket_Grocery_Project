import './Navbar.css';
import logo from '../../assets/Images/Images/logo_ai.png'
import { FaUser, FaHeart, FaShoppingCart, FaSearch } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import PropTypes from 'prop-types';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { toggleNav, closeNav } from '../../store/navbarSlice';
import { useState } from 'react';

const Navbar = ({ setShowLogin }) => {

    const [showSearchOverlay, setShowSearchOverlay] = useState(false);
    const isNavOpen = useSelector((state) => state.navbar.isNavOpen);
    const totalItems = useSelector((state) => state.cart.totalQuantity);
    const wishlist = useSelector((state) => state.wishlist.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleNavToggle = () => dispatch(toggleNav());

    const handleNavLinkClick = (path) => {
        dispatch(closeNav());
        navigate(path);
    };

    const toggleSearchOverlay = () => setShowSearchOverlay(!showSearchOverlay);

    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid px-5">
                    {/* Logo */}
                    <Link to="/" className="navbar-brand d-flex align-items-center" onClick={() => handleNavLinkClick('/')}>
                        <img src={logo} />
                    </Link>

                    <button className="navbar-toggler" type="button" onClick={handleNavToggle}>
                        <span><IoMenu /></span>
                    </button>
                    <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <button className="nav-link btn-link" onClick={() => handleNavLinkClick('/')}>Home</button>
                            </li>
                            <li className="nav-item dropdown">
                                <button className="nav-link btn-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Product
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><button className="dropdown-item btn-link" onClick={() => handleNavLinkClick('/fruits')}>Fruits</button></li>
                                    <li><button className="dropdown-item btn-link" onClick={() => handleNavLinkClick('/vegetables')}>Vegetables</button></li>
                                    <li><button className="dropdown-item btn-link" onClick={() => handleNavLinkClick('/drinks')}>Drinks</button></li>
                                    <li><button className="dropdown-item btn-link" onClick={() => handleNavLinkClick('/snacks')}>Snacks</button></li>
                                    <li><button className="dropdown-item btn-link" onClick={() => handleNavLinkClick('/chocolates')}>Chocolates</button></li>
                                    <li><button className="dropdown-item btn-link" onClick={() => handleNavLinkClick('/grocery')}>Grocery</button></li>
                                </ul>
                            </li>
                            <li><button className="nav-link btn-link" onClick={() => handleNavLinkClick('/about')}>About</button></li>
                            <li className="nav-item dropdown">
                                <button className="nav-link btn-link dropdown-toggle" id="navbarDropdown2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    More
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown2">
                                   
                                    <li><button className="dropdown-item btn-link" onClick={() => handleNavLinkClick('/blog')}>Blogs</button></li>
                                    <li><button className="dropdown-item btn-link" onClick={() => handleNavLinkClick('/contact')}>Contact</button></li>
                                </ul>
                            </li>
                        </ul>
                        {/* Search Icon for Mobile */}
                        <div className="d-lg-none ms-3 mb-2">
                            <button onClick={toggleSearchOverlay} className="btn-link nav-link">
                                <FaSearch size={22} style={{color:'green'}}/>
                            </button>
                        </div>

                        {/* Full Search Bar for Larger Screens */}
                        <form className="d-none d-lg-flex mx-3 search-box" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn search_btn" type="submit">Search</button>
                        </form>

                        <ul className="navbar-nav ms-3">
                            <li className="nav-item" style={{ position: 'relative' }}>
                                <Link to={'/wishlist'} className="nav-link" onClick={() => handleNavLinkClick('/wishlist')}><FaHeart size={22} />
                                    {wishlist.length > 0 && (
                                        <span className="badge rounded-circle bg-danger" style={{
                                            position: 'absolute',
                                            top: '-5px',
                                            right: '-5px',
                                            fontSize: '0.8rem',
                                            width: '5px',
                                            display: 'flex',
                                            justifyContent: "center"
                                        }}>
                                            {wishlist.length}
                                        </span>)}
                                </Link>
                            </li>
                            <li className="nav-item" style={{ position: 'relative' }}>
                                <Link to={'/cart'} className="nav-link" onClick={() => handleNavLinkClick('/cart')}><FaShoppingCart size={22} />
                                    {totalItems > 0 && (
                                        <span className="badge rounded-circle bg-danger" style={{
                                            position: 'absolute',
                                            top: '-5px',
                                            right: '-5px',
                                            fontSize: '0.8rem',
                                            width: '5px',
                                            display: 'flex',
                                            justifyContent: "center"
                                        }}>
                                            {totalItems}
                                        </span>)}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <button onClick={() => setShowLogin(true)} className="nav-link btn-link"><FaUser size={22} /></button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

Navbar.propTypes = {
    setShowLogin: PropTypes.func.isRequired,
};

export default Navbar;