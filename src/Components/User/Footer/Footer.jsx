// import React from 'react';
import './Footer.css';
import { IoCall } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';
import { FaAddressCard, FaLinkedin, FaInstagramSquare, FaFacebookSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="outer-container py-4">
            <div className="container footer-container">
                <div className="row">
                    {/* Quick Links */}
                    <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                        <h3 className="footer-titles">Quick Links</h3>
                        <ul className="list-unstyled">
                            <li><Link to="/">Home</Link></li>
                            <li><Link>Offer</Link></li>
                            <li><Link>Wishlist</Link></li>
                            <li><Link>Cart</Link></li>
                            <li><Link>Account</Link></li>
                        </ul>
                    </div>

                    {/* Information */}
                    <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                        <h3 className="footer-titles">Information</h3>
                        <ul className="list-unstyled">
                            <li><Link to="/user/about">About Us</Link></li>
                            <li><Link to="/user/blog">Blogs</Link></li>
                            <li><Link to="/user/contact">Contact Us</Link></li>
                            <li><Link to="/user/">Terms and Services</Link></li>
                            <li><Link to="/">Refund Policy</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                        <h3 className="footer-titles">Categories</h3>
                        <ul className="list-unstyled">
                            <li><Link to="/user/fruits">Fruits</Link></li>
                            <li><Link to="/user/vegetables">Vegetables</Link></li>
                            <li><Link to="/user/chocolates">Chocolate</Link></li>
                            <li><Link to="/user/drinks">Coldrinks</Link></li>
                            <li><Link to="/user/snacks">Snacks</Link></li>
                            <li><Link to="/user/grocery">Grocery</Link></li>
                        </ul>
                    </div>

                    {/* About Store */}
                    <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                        <h3 className="footer-titles">About Store</h3>
                        <ul className="list-unstyled">
                            <li><a href="#"><IoCall className="me-3" /> +91 6266059961</a></li>
                            <li><a href="#"><MdEmail className="me-3" /> GreenBasket@gmail.com</a></li>
                            <li><a href="#"><FaAddressCard className="me-3" /> 18, Khategaon M.P.</a></li>
                            <li className="icon-s">
                                <a href="#"><FaLinkedin /></a>
                                <a href="#"><FaInstagramSquare /></a>
                                <a href="#"><FaFacebookSquare /></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
