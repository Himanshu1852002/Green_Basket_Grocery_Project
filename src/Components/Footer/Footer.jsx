// eslint-disable-next-line no-unused-vars
import React from 'react'
import './Footer.css';
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Footer = () => {
    return (


        <div>
            <div className="outer-container">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6 mb-md-3 mb-sm-3 colm">
                            <h3>Quick Links</h3>
                            <ul className="list-group">
                                <li className="list-group-item"><Link to={'/'}>Home</Link></li>
                                <li className="list-group-item"><Link >Offer</Link></li>
                                <li className="list-group-item"><Link >Wishlist</Link></li>
                                <li className="list-group-item"><Link >Cart</Link></li>
                                <li className="list-group-item"><Link >Account</Link></li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 mb-md-3 mb-sm-3 colm">
                            <h3>Information</h3>
                            <ul className="list-group">
                                <li className="list-group-item"><Link to={'/about'}>About Us</Link></li>
                                <li className="list-group-item"><Link to={'/blog'}>Blogs</Link></li>
                                <li className="list-group-item"><Link to={'/contact'}>Contact Us</Link></li>
                                <li className="list-group-item"><Link to={'/'}>Terms and Services</Link></li>
                                <li className="list-group-item"><Link to={'/'}>Refund Policy</Link></li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 colm">
                            <h3>Categories</h3>
                            <ul className="list-group">
                                <li className="list-group-item"><Link to={'/fruits'}>Fruits</Link></li>
                                <li className="list-group-item"><Link to={'/vegetables'}>Vegetables</Link></li>
                                <li className="list-group-item"><Link to={'/chocolates'}>Chocolate</Link></li>
                                <li className="list-group-item"><Link to={'/drinks'}>Coldrinks</Link></li>
                                <li className="list-group-item"><Link to={'/snacks'}>Snacks</Link></li>
                                <li className="list-group-item"><Link to={'/grocery'}>Grocery</Link></li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 colm">
                            <h3>About Store</h3>
                            <ul className="list-group">
                                <li className="list-group-item"><a href="#"><IoCall /> +91 6266059961</a></li>
                                <li className="list-group-item"><a href="#"><MdEmail />
                                    GreenBasket@gmail.com</a></li>
                                <li className="list-group-item"><a href="#"><FaAddressCard /> 18, Khategaon
                                    M.P.</a></li>
                                <li className="list-group-item icon-s">
                                    <a href="#"><FaLinkedin /></a>
                                    <a href="#"><FaInstagramSquare /></a>
                                    <a href="$"><FaFacebookSquare /></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* / */}
        </div>

    )
}

export default Footer