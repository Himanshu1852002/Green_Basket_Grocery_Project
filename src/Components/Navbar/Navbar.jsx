
import './Navbar.css'
import logo_img from '../../assets/Images/Images/basketgreen.png'
import logo_text from '../../assets/Images/Images/greenbaket.png'
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const Navbar = ({ setShowLogin }) => {

    const totalItems = useSelector((state) => state.cart.totalQuantity);
    const wishlist = useSelector((state) => state.wishlist.items);

    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid nav-container">
                    <Link className="navbar-brand">
                        <img src={logo_img} alt="Logo" style={{ width: 40 }} />
                        <img src={logo_text} alt />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span><IoMenu /></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={'/'} className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Product
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link to={'/fruits'} className="dropdown-item">Fruits</Link></li>
                                    <li><Link to={'/vegetables'} className="dropdown-item">Vegetables</Link></li>
                                    <li><Link to={'/drinks'} className="dropdown-item">Drinks</Link></li>
                                    <li><Link to={'/snacks'} className="dropdown-item">Snacks</Link></li>
                                    <li><Link to={'/chocolates'} className="dropdown-item">Chocolates</Link></li>
                                    <li><Link to={'/grocery'} className="dropdown-item">Grocery</Link></li>
                                </ul>
                            </li>
                            <li><a className="nav-link" href="#">Offers</a></li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    More
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown2">
                                    <li><Link to={'/about'} className="dropdown-item">About</Link></li>
                                    <li><Link to={'/blog'} className="dropdown-item">Blogs</Link></li>
                                    <li><Link to={'/contact'} className="dropdown-item">Contact</Link></li>
                                </ul>
                            </li>
                        </ul>
                        <form className="d-flex search-box">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn" type="submit">
                                Search
                            </button>
                        </form>
                        <ul className="navbar-nav ms-3">
                            <li className="nav-item" style={{ position: 'relative' }}>
                                <Link to={'/wishlist'} className="nav-link"><FaHeart size={22} />
                                    {wishlist.length > 0 && (
                                        <span
                                            className="badge rounded-circle bg-danger"
                                            style={{
                                                position: 'absolute',
                                                top: '-5px',
                                                right: '-5px',
                                                fontSize: '0.8rem',
                                                width: '5px',
                                                display: 'flex',
                                                justifyContent: "center"


                                            }}
                                        >
                                            {wishlist.length}
                                        </span>)}
                                </Link>
                            </li>
                            <li className="nav-item" style={{ position: 'relative' }}>
                                <Link to={'/cart'} className="nav-link"><FaShoppingCart size={22} />
                                    {totalItems > 0 && (
                                        <span
                                            className="badge rounded-circle bg-danger"
                                            style={{
                                                position: 'absolute',
                                                top: '-5px',
                                                right: '-5px',
                                                fontSize: '0.8rem',
                                                width: '5px',
                                                display: 'flex',
                                                justifyContent: "center"


                                            }}
                                        >
                                            {totalItems}
                                        </span>)}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link onClick={() => setShowLogin(true)} className="nav-link" href="#"><FaUser size={22} /></Link>
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
}

export default Navbar