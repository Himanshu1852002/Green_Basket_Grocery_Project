// eslint-disable-next-line no-unused-vars
import React from 'react'
import './Footer.css';
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
const Footer = () => {
    return (


        <div>
            <div className="outer-container">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6 mb-md-3 mb-sm-3 colm">
                            <h3>Quick Links</h3>
                            <ul className="list-group">
                                <li className="list-group-item"><a href="#">Home</a></li>
                                <li className="list-group-item"><a href="#">Offer</a></li>
                                <li className="list-group-item"><a href="#">Wishlist</a></li>
                                <li className="list-group-item"><a href="#">Cart</a></li>
                                <li className="list-group-item"><a href="#">Account</a></li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 mb-md-3 mb-sm-3 colm">
                            <h3>Information</h3>
                            <ul className="list-group">
                                <li className="list-group-item"><a href="#">About Us</a></li>
                                <li className="list-group-item"><a href="#">Blogs</a></li>
                                <li className="list-group-item"><a href="#">Contact Us</a></li>
                                <li className="list-group-item"><a href="#">Terms and Services</a></li>
                                <li className="list-group-item"><a href="#">Refund Policy</a></li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 colm">
                            <h3>Categories</h3>
                            <ul className="list-group">
                                <li className="list-group-item"><a href="#">Fruits</a></li>
                                <li className="list-group-item"><a href="#">Vegetables</a></li>
                                <li className="list-group-item"><a href="#">Chocolate</a></li>
                                <li className="list-group-item"><a href="#">Coldrinks</a></li>
                                <li className="list-group-item"><a href="#">Snacks</a></li>
                                <li className="list-group-item"><a href="#">Groceries</a></li>
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