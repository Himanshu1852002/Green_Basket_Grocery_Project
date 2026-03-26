import './Footer.css';
import { IoCall } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';
import { FaMapMarkerAlt, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="ft-footer">
            {/* Wave separator */}
            <div className="ft-wave">
                <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#1a4d2e" />
                </svg>
            </div>

            <div className="ft-main">
                <div className="ft-grid">

                    {/* Brand */}
                    <div className="ft-brand">
                        <div className="ft-logo">
                            <div className="ft-logo-icon">
                                <svg width="22" height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 12h20l-2.5 10H6.5L4 12z" fill="#4caf50" />
                                    <path d="M7 12l1.5 10M14 12v10M21 12l-1.5 10" stroke="#fff" strokeWidth="0.8" strokeOpacity="0.3"/>
                                    <path d="M5.5 17h17M5 14.5h18" stroke="#fff" strokeWidth="0.8" strokeOpacity="0.2"/>
                                    <path d="M9 12 Q9 6 14 6 Q19 6 19 12" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round"/>
                                    <path d="M14 6 Q16 3 19 4 Q17 7 14 6Z" fill="#a5d6a7"/>
                                </svg>
                            </div>
                            <div className="ft-logo-text">
                                <span className="ft-logo-green">Green</span>
                                <span className="ft-logo-white">Basket</span>
                            </div>
                        </div>
                        <p className="ft-tagline">Fresh groceries delivered to your doorstep. Quality you can trust, prices you'll love.</p>
                        <div className="ft-socials">
                            <a href="#" className="ft-social-btn" title="LinkedIn"><FaLinkedin size={16} /></a>
                            <a href="#" className="ft-social-btn" title="Instagram"><FaInstagram size={16} /></a>
                            <a href="#" className="ft-social-btn" title="Facebook"><FaFacebook size={16} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="ft-col">
                        <h4 className="ft-col-title">Quick Links</h4>
                        <ul className="ft-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/user/wishlist">Wishlist</Link></li>
                            <li><Link to="/user/myorders">My Orders</Link></li>
                            <li><Link to="/user/blog">Blog</Link></li>
                            <li><Link to="/user/about">About Us</Link></li>
                            <li><Link to="/user/contact">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div className="ft-col">
                        <h4 className="ft-col-title">Categories</h4>
                        <ul className="ft-links">
                            <li><Link to="/user/fruits">Fruits</Link></li>
                            <li><Link to="/user/vegetables">Vegetables</Link></li>
                            <li><Link to="/user/chocolates">Chocolates</Link></li>
                            <li><Link to="/user/drinks">Cold Drinks</Link></li>
                            <li><Link to="/user/snacks">Snacks</Link></li>
                            <li><Link to="/user/grocery">Grocery</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="ft-col">
                        <h4 className="ft-col-title">Contact Us</h4>
                        <ul className="ft-contact-list">
                            <li>
                                <span className="ft-contact-icon"><IoCall size={14} /></span>
                                <span>+91 6266059961</span>
                            </li>
                            <li>
                                <span className="ft-contact-icon"><MdEmail size={14} /></span>
                                <span>GreenBasket@gmail.com</span>
                            </li>
                            <li>
                                <span className="ft-contact-icon"><FaMapMarkerAlt size={14} /></span>
                                <span>18, Khategaon, M.P.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="ft-bottom">
                <p>© {new Date().getFullYear()} Green Basket. All rights reserved.</p>
                <div className="ft-bottom-links">
                    <Link to="/user/privacy-policy">Privacy Policy</Link>
                    <Link to="/user/terms-of-service">Terms of Service</Link>
                    <Link to="/user/refund-policy">Refund Policy</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
